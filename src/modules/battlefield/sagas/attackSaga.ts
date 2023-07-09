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
import { AREA_CONTAINER_ID, ATTACK_TYPE, TROOPER_TEAM } from '../constants';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { getTrooperNode } from '../troopersNodesMap';
import { applyAbilities } from './abilitiesSaga';

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
  const { criticalChance, criticalMultiplier } = activeTrooper;
  const { evadeChance } = selectedTrooper;
  const [minDamage, maxDamage] = activeTrooper.damage.split('-');
  let isDying = false;
  let isEvading = false;
  let isCriticalDamage = false;
  let damage = getRandomNumberInRange(
    parseInt(minDamage!, 10),
    parseInt(maxDamage!, 10)
  );

  if (criticalChance) {
    isCriticalDamage = criticalChance >= getRandomNumberInRange(1, 100);
    if (isCriticalDamage && criticalMultiplier) {
      damage = Math.round(damage * criticalMultiplier);
    }
  }

  if (selectedTrooper.defence) {
    damage = damage - Math.floor((damage / 100) * selectedTrooper.defence);
  }

  if (evadeChance) {
    isEvading = evadeChance >= getRandomNumberInRange(1, 100);
    if (isEvading) {
      damage = 0;
    }
  }

  if (damage >= selectedTrooper.currentHealth) {
    damage = damage - (damage - selectedTrooper.currentHealth);
    isDying = true;
  }

  return { damage, isDying, isEvading, isCriticalDamage };
};

function* playRangeAttackAnimation({
  activeTrooperId,
  selectedTrooperId,
  attackId,
  isDying,
  isEvading
}: {
  activeTrooperId: Trooper['id'];
  selectedTrooperId: Trooper['id'];
  attackId: string;
  isDying: boolean;
  isEvading: boolean;
}) {
  const activeTrooperAnimationInstance = yield* call(
    getTrooperAnimationInstance,
    activeTrooperId
  );
  const attackedTrooperAnimationInstance = yield* call(
    getTrooperAnimationInstance,
    selectedTrooperId
  );
  const archerAnimation = yield* call(getAreaEffectAnimationInstance, attackId);

  yield* call([activeTrooperAnimationInstance!, 'shoot']);
  yield* call([archerAnimation!, 'play']);

  if (isDying) {
    yield* fork([attackedTrooperAnimationInstance!, 'die']);
    return;
  }

  if (!isEvading) {
    yield* fork([attackedTrooperAnimationInstance!, 'hurt']);
  }
}

function* playAttackAnimation({
  activeTrooperId,
  selectedTrooperInfo,
  damage,
  isDying,
  isEvading,
  isCriticalDamage
}: {
  activeTrooperId: Trooper['id'];
  selectedTrooperInfo: Pick<Trooper, 'id' | 'team'>;
  damage: number;
  isDying: boolean;
  isEvading: boolean;
  isCriticalDamage: boolean;
}) {
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
      call(applyAbilities, { id: selectedTrooperInfo.id }),
      call([attackedTrooperAnimationInstance!, 'die']),
      put(
        applyDamage({
          damage,
          team: selectedTrooperInfo.team,
          id: selectedTrooperInfo.id,
          isEvading,
          isCriticalDamage
        })
      ),
      call([activeTrooperAnimationInstance!, 'meleeGoBack'], {
        tileNode
      })
    ]);

    return;
  }

  if (isEvading) {
    yield* put(
      applyDamage({
        damage,
        team: selectedTrooperInfo.team,
        id: selectedTrooperInfo.id,
        isEvading,
        isCriticalDamage
      })
    );

    yield* call([activeTrooperAnimationInstance!, 'meleeGoBack'], {
      tileNode
    });
  }

  yield* all([
    call([attackedTrooperAnimationInstance!, 'hurt']),
    call(applyAbilities, { id: selectedTrooperInfo.id }),
    put(
      applyDamage({
        damage,
        team: selectedTrooperInfo.team,
        id: selectedTrooperInfo.id,
        isEvading,
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
  const { damage, isCriticalDamage, isEvading, isDying } = calculateDamage(
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
        team: enemyTrooper.team,
        id: enemyTrooper.id,
        isEvading,
        isCriticalDamage
      })
    );
    return;
  }

  if (!isEvading) {
    yield* fork([attackedTrooperAnimationInstance!, 'hurt']);
  }

  yield* put(
    applyDamage({
      damage,
      team: enemyTrooper.team,
      id: enemyTrooper.id,
      isEvading,
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
  const { damage, isDying, isEvading, isCriticalDamage } = calculateDamage(
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

    yield* call([activeTrooperAnimationInstance!, 'cast']);

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
        isEvading
      });
    }

    yield* all([
      call(applyAbilities, { id: selectedTrooperInfo.id }),
      put(
        applyDamage({
          damage,
          team: selectedTrooperInfo.team,
          id: selectedTrooperInfo.id,
          isEvading,
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
      isDying,
      isEvading,
      isCriticalDamage
    });
  }

  yield* put(attackFinished(selectedTrooperInfo));
}

export function* attackSagaWatcher() {
  yield takeLatest(attackStarted, attack);
}
