import {
  takeLatest,
  put,
  select,
  call,
  fork,
  all
} from 'typed-redux-saga/macro';
import { attackStarted, attackFinished, applyDamage } from '../actions';
import { getTileNode } from '../tilesNodesMap';

import type { Trooper } from '../types';
import {
  activeTrooperSelector,
  attackersSelector,
  defendersSelector,
  makeCharacterByIdSelector
} from '../selectors';
import {
  getElementBoundsWithinContainer,
  getRandomNumberInRange
} from 'common/helpers';
import { AREA_CONTAINER_ID, TROOPER_TEAM } from '../constants';
import { ATTACK_TYPE, DAMAGE_TYPE } from 'common/constants';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { getTrooperNode } from '../troopersNodesMap';
import { applyCurses } from './abilitiesSaga';
import { applyDefenceAndResistance } from 'common/helpers/applyDefenceAndResistance';
import type { DamageType } from 'common/types';

function* getEnemyCoordinates(id: Trooper['id']) {
  const tileNode = getTileNode(id);
  const areaContainer = document.getElementById(AREA_CONTAINER_ID);
  const { x, width, height, y } = getElementBoundsWithinContainer(
    tileNode!,
    areaContainer!
  );

  return { x: x + width / 2, y: y + height / 2 };
}

const calculateDamage = (selectedTrooper: Trooper, activeTrooper: Trooper) => {
  const { criticalChance, criticalMultiplier, hitChance, damageType } =
    activeTrooper;
  const { evadeChance } = selectedTrooper;
  const [minDamage, maxDamage] = activeTrooper.damage.split('-');
  let isDying = false;
  const successHit =
    getRandomNumberInRange(1, 100) <= hitChance - (evadeChance || 0);
  const hasMissed = !successHit;

  let isCriticalDamage = false;
  let damage = getRandomNumberInRange(
    parseInt(minDamage!, 10),
    parseInt(maxDamage!, 10)
  );

  // Apply critical chance
  if (criticalChance) {
    isCriticalDamage = getRandomNumberInRange(1, 100) <= criticalChance;
    if (isCriticalDamage && criticalMultiplier) {
      damage = Math.round(damage * criticalMultiplier);
    }
  }

  // Apply DEFENCE and RESISTANCE
  damage = applyDefenceAndResistance(damage, damageType, selectedTrooper);

  // Apply hit chance
  if (hasMissed) {
    damage = 0;
  }

  if (damage >= selectedTrooper.currentHealth) {
    damage = damage - (damage - selectedTrooper.currentHealth);
    isDying = true;
  }

  return { damage, isDying, hasMissed, isCriticalDamage, damageType };
};

function* playCounterAttackAnimation({
  activeTrooper,
  enemyTrooper,
  counterAttackDamage
}: {
  activeTrooper: Trooper;
  enemyTrooper: Trooper;
  counterAttackDamage: ReturnType<typeof calculateDamage>;
}) {
  const { isDying, damage, hasMissed, isCriticalDamage } = counterAttackDamage;
  const tileNode = getTileNode(activeTrooper.id);
  const activeTrooperAnimationInstance = yield* call(
    getTrooperAnimationInstance,
    activeTrooper.id
  );
  const attackedTrooperAnimationInstance = yield* call(
    getTrooperAnimationInstance,
    enemyTrooper.id
  );

  if (isDying) {
    yield* all([
      call([attackedTrooperAnimationInstance!, 'attack']),
      call([activeTrooperAnimationInstance!, 'die']),
      put(
        applyDamage({
          damage,
          damageType: enemyTrooper.damageType,
          team: activeTrooper?.team,
          id: activeTrooper?.id,
          hasMissed,
          isCriticalDamage
        })
      )
    ]);
    if (tileNode) {
      tileNode.style.zIndex = '-1';
    }
    return;
  }

  if (hasMissed) {
    yield* all([
      call([attackedTrooperAnimationInstance!, 'attack']),
      put(
        applyDamage({
          damage,
          damageType: enemyTrooper.damageType,
          team: activeTrooper?.team,
          id: activeTrooper?.id,
          hasMissed,
          isCriticalDamage
        })
      )
    ]);
    return;
  }

  yield* all([
    call([attackedTrooperAnimationInstance!, 'attack']),
    call([activeTrooperAnimationInstance!, 'hurt']),
    put(
      applyDamage({
        damage: counterAttackDamage.damage,
        damageType: enemyTrooper.damageType,
        team: activeTrooper?.team,
        id: activeTrooper?.id,
        hasMissed: counterAttackDamage.hasMissed,
        isCriticalDamage: counterAttackDamage.isCriticalDamage
      })
    )
  ]);
}

function* playRangeAttackAnimation({
  activeTrooperId,
  selectedTrooperId,
  attackId,
  isDying,
  hasMissed,
  damageType
}: {
  activeTrooperId: Trooper['id'];
  selectedTrooperId: Trooper['id'];
  attackId: string;
  isDying: boolean;
  hasMissed: boolean;
  damageType: DamageType;
}) {
  const activeTrooperAnimationInstance = yield* call(
    getTrooperAnimationInstance,
    activeTrooperId
  );
  const attackedTrooperAnimationInstance = yield* call(
    getTrooperAnimationInstance,
    selectedTrooperId
  );
  const rangeAttackAnimation = yield* call(
    getAreaEffectAnimationInstance,
    attackId
  );

  if (damageType === DAMAGE_TYPE.PHYSICAL) {
    yield* call([activeTrooperAnimationInstance!, 'shoot']);
  } else {
    yield* fork([activeTrooperAnimationInstance!, 'cast']);
  }
  yield* call([rangeAttackAnimation!, 'play']);

  if (isDying) {
    yield* fork([attackedTrooperAnimationInstance!, 'die']);
    return;
  }

  if (!hasMissed) {
    yield* fork([attackedTrooperAnimationInstance!, 'hurt']);
  }
}

function* playAttackAnimation({
  activeTrooperId,
  selectedTrooperInfo,
  damage,
  damageType,
  isDying,
  hasMissed,
  isCriticalDamage
}: {
  activeTrooperId: Trooper['id'];
  selectedTrooperInfo: Pick<Trooper, 'id' | 'team'>;
  damage: number;
  damageType: DamageType;
  isDying: boolean;
  hasMissed: boolean;
  isCriticalDamage: boolean;
}) {
  const activeTrooper = yield* select(activeTrooperSelector);
  const enemyTrooper = yield* select(
    makeCharacterByIdSelector(selectedTrooperInfo.id)
  );

  if (!enemyTrooper || !activeTrooper) {
    return;
  }

  const activeTrooperAnimationInstance = yield* call(
    getTrooperAnimationInstance,
    activeTrooperId
  );
  const attackedTrooperAnimationInstance = yield* call(
    getTrooperAnimationInstance,
    selectedTrooperInfo.id
  );
  const activeTrooperNode = getTrooperNode(activeTrooperId);
  const attackedTrooperNode = getTrooperNode(selectedTrooperInfo.id);
  const containerNode = document.getElementById(AREA_CONTAINER_ID);
  const activeTrooperBounds = getElementBoundsWithinContainer(
    activeTrooperNode!,
    containerNode!
  );
  const attackedTrooperBounds = getElementBoundsWithinContainer(
    attackedTrooperNode!,
    containerNode!
  );
  const tileNode = getTileNode(activeTrooperId);
  if (!tileNode || !attackedTrooperBounds || !activeTrooperBounds) return;

  yield* call([activeTrooperAnimationInstance!, 'meleeAttack'], {
    characterBounds: activeTrooperBounds,
    targetBounds: attackedTrooperBounds,
    tileNode
  });

  if (isDying) {
    yield* all([
      call([attackedTrooperAnimationInstance!, 'die']),
      put(
        applyDamage({
          damage,
          damageType,
          team: selectedTrooperInfo.team,
          id: selectedTrooperInfo.id,
          hasMissed,
          isCriticalDamage
        })
      ),
      call([activeTrooperAnimationInstance!, 'meleeGoBack'], {
        tileNode
      })
    ]);

    return;
  }

  const counterAttacked =
    enemyTrooper.attackType === ATTACK_TYPE.MELEE &&
    getRandomNumberInRange(1, 100) <= (enemyTrooper.counterAttackChance || 0);

  if (hasMissed) {
    yield* put(
      applyDamage({
        damage,
        damageType,
        team: selectedTrooperInfo.team,
        id: selectedTrooperInfo.id,
        hasMissed,
        isCriticalDamage
      })
    );

    const counterAttackDamage = calculateDamage(activeTrooper, enemyTrooper);
    if (counterAttacked) {
      yield* call(playCounterAttackAnimation, {
        activeTrooper,
        enemyTrooper,
        counterAttackDamage
      });
    }

    if (!counterAttackDamage.isDying) {
      yield* call([activeTrooperAnimationInstance!, 'meleeGoBack'], {
        tileNode
      });
    }

    return;
  }

  if (counterAttacked) {
    yield* all([
      call([attackedTrooperAnimationInstance!, 'hurt']),
      call(applyCurses, { id: selectedTrooperInfo.id }),
      put(
        applyDamage({
          damage,
          damageType,
          team: selectedTrooperInfo.team,
          id: selectedTrooperInfo.id,
          hasMissed,
          isCriticalDamage
        })
      )
    ]);

    const counterAttackDamage = calculateDamage(activeTrooper, enemyTrooper);
    if (counterAttacked) {
      yield* call(playCounterAttackAnimation, {
        activeTrooper,
        enemyTrooper,
        counterAttackDamage
      });
    }

    if (!counterAttackDamage.isDying) {
      yield* call([activeTrooperAnimationInstance!, 'meleeGoBack'], {
        tileNode
      });
    }
    return;
  }

  yield* all([
    call([attackedTrooperAnimationInstance!, 'hurt']),
    call(applyCurses, { id: selectedTrooperInfo.id }),
    put(
      applyDamage({
        damage,
        damageType,
        team: selectedTrooperInfo.team,
        id: selectedTrooperInfo.id,
        hasMissed,
        isCriticalDamage
      })
    ),
    call([activeTrooperAnimationInstance!, 'meleeGoBack'], {
      tileNode
    })
  ]);
}

function* handleEnemyTrooperDamage({
  enemyTrooper,
  activeTrooper
}: {
  enemyTrooper: Trooper;
  activeTrooper: Trooper;
}) {
  const { damage, isCriticalDamage, hasMissed, isDying } = calculateDamage(
    enemyTrooper,
    activeTrooper
  );

  const attackedTrooperAnimationInstance = yield* call(
    getTrooperAnimationInstance,
    enemyTrooper.id
  );

  if (isDying) {
    yield* fork([attackedTrooperAnimationInstance!, 'die']);
    yield* put(
      applyDamage({
        damage,
        damageType: activeTrooper.damageType,
        team: enemyTrooper.team,
        id: enemyTrooper.id,
        hasMissed,
        isCriticalDamage
      })
    );
    return;
  }

  if (!hasMissed) {
    yield* fork([attackedTrooperAnimationInstance!, 'hurt']);
  }

  yield* put(
    applyDamage({
      damage,
      damageType: activeTrooper.damageType,
      team: enemyTrooper.team,
      id: enemyTrooper.id,
      hasMissed,
      isCriticalDamage
    })
  );
}

function* attack({
  payload: selectedTrooperInfo
}: {
  payload: Pick<Trooper, 'id' | 'team'>;
}) {
  const activeTrooper = yield* select(activeTrooperSelector);
  const selectedTrooper = yield* select(
    makeCharacterByIdSelector(selectedTrooperInfo.id)
  );
  const { damage, isDying, hasMissed, isCriticalDamage } = calculateDamage(
    selectedTrooper!,
    activeTrooper!
  );

  if (activeTrooper?.attackType === ATTACK_TYPE.SPLASH) {
    const teamSelector =
      selectedTrooperInfo.team === TROOPER_TEAM.ATTACKERS
        ? attackersSelector
        : defendersSelector;
    const enemyTeam = yield* select(teamSelector);

    const activeTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      activeTrooper.id
    );

    yield* fork([activeTrooperAnimationInstance!, 'cast']);

    const tasks = [];
    const coordinates = [];

    for (const enemyTrooper of enemyTeam) {
      if (enemyTrooper.currentHealth > 0) {
        tasks.push(
          call(handleEnemyTrooperDamage, {
            activeTrooper,
            enemyTrooper
          })
        );

        // TODO: decide how abilities should apply for splash attack
        const coordinate = yield* call(getEnemyCoordinates, enemyTrooper.id);

        coordinates.push(coordinate);
      }
    }

    const attackAnimation = yield* call(
      getAreaEffectAnimationInstance,
      activeTrooper.attackId!
    );

    yield* call([attackAnimation!, 'play'], coordinates);

    yield* all(tasks);
  }

  if (activeTrooper?.attackType === ATTACK_TYPE.RANGE) {
    if (activeTrooper?.attackId) {
      yield* call(playRangeAttackAnimation, {
        activeTrooperId: activeTrooper.id,
        selectedTrooperId: selectedTrooperInfo.id,
        attackId: activeTrooper.attackId,
        isDying,
        hasMissed,
        damageType: activeTrooper.damageType
      });
    }

    yield* all([
      call(applyCurses, { id: selectedTrooperInfo.id }),
      put(
        applyDamage({
          damage,
          damageType: activeTrooper.damageType,
          team: selectedTrooperInfo.team,
          id: selectedTrooperInfo.id,
          hasMissed,
          isCriticalDamage
        })
      )
    ]);
  }

  if (activeTrooper?.attackType === ATTACK_TYPE.MELEE) {
    yield* call(playAttackAnimation, {
      activeTrooperId: activeTrooper.id,
      selectedTrooperInfo,
      damage,
      damageType: activeTrooper.damageType,
      isDying,
      hasMissed,
      isCriticalDamage
    });
  }

  yield* put(attackFinished(selectedTrooperInfo));
}

export function* attackSagaWatcher() {
  yield takeLatest(attackStarted, attack);
}
