import { takeLatest, put, select, call, fork } from 'typed-redux-saga/macro';
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
import { ATTACK_TYPE, TROOPER_TEAM } from '../constants';
import { getTrooperAnimationInstance } from '../../animation/troopersAnimationInstances';
import { getAreaEffectAnimationInstance } from '../../animation/areaEffectsAnimationInstances';
import { toggleBattlefieldStatus } from 'modules/battlefield/actions';
import { getTrooperNode } from '../troopersNodesMap';

const calculateDamage = (selectedTrooper: Trooper, activeTrooper: Trooper) => {
  const { criticalChance, criticalMultiplier } = activeTrooper;
  const [minDamage, maxDamage] = activeTrooper.damage.split('-');
  let isDying = false;
  let damage = getRandomNumberInRange(
    parseInt(minDamage!, 10),
    parseInt(maxDamage!, 10)
  );

  if (criticalChance) {
    const isCriticalDamage = criticalChance >= getRandomNumberInRange(1, 100);
    if (isCriticalDamage && criticalMultiplier) {
      damage = Math.round(damage * criticalMultiplier);
    }
  }

  if (damage >= selectedTrooper.currentHealth) {
    damage = damage - (damage - selectedTrooper.currentHealth);
    isDying = true;
  }

  return { damage, isDying };
};

function* playRangeAttackAnimation({
  activeTrooperId,
  selectedTrooperId,
  attackId,
  isDying
}: {
  activeTrooperId: Trooper['id'];
  selectedTrooperId: Trooper['id'];
  attackId: string;
  isDying: boolean;
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

  yield* put(toggleBattlefieldStatus());

  yield* call([activeTrooperAnimationInstance!, 'shoot']);
  yield* call([archerAnimation!, 'play']);

  if (isDying) {
    yield* call([attackedTrooperAnimationInstance!, 'die']);
  } else {
    yield* call([attackedTrooperAnimationInstance!, 'hurt']);
  }

  yield* put(toggleBattlefieldStatus());
}

function* playAttackAnimation({
  activeTrooperId,
  selectedTrooperInfo,
  damage,
  isDying
}: {
  activeTrooperId: Trooper['id'];
  selectedTrooperInfo: Pick<Trooper, 'id' | 'team'>;
  damage: number;
  isDying: boolean;
}) {
  yield* put(toggleBattlefieldStatus());

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
  const containerNode = document.getElementById('area-container');
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
    yield* fork([attackedTrooperAnimationInstance!, 'die']);
  } else {
    yield* fork([attackedTrooperAnimationInstance!, 'hurt']);
  }

  yield* put(
    applyDamage({
      damage,
      team: selectedTrooperInfo.team,
      id: selectedTrooperInfo.id
    })
  );

  yield* call([activeTrooperAnimationInstance!, 'meleeGoBack'], {
    tileNode
  });

  yield* put(toggleBattlefieldStatus());
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
  const { damage, isDying } = calculateDamage(selectedTrooper!, activeTrooper!);

  if (activeTrooper?.attackType === ATTACK_TYPE.SPLASH) {
    const teamSelector =
      selectedTrooperInfo.team === TROOPER_TEAM.ATTACKERS
        ? attackersSelector
        : defendersSelector;
    const enemyTeam = yield* select(teamSelector);

    for (const enemyTrooper of enemyTeam) {
      const { damage } = calculateDamage(enemyTrooper, activeTrooper);

      yield* put(
        applyDamage({
          damage,
          team: selectedTrooperInfo.team,
          id: selectedTrooperInfo.id
        })
      );
    }

    return;
  }

  if (activeTrooper?.attackType === ATTACK_TYPE.RANGE) {
    if (activeTrooper?.attackId) {
      yield* call(playRangeAttackAnimation, {
        activeTrooperId: activeTrooper.id,
        selectedTrooperId: selectedTrooperInfo.id,
        attackId: activeTrooper.attackId,
        isDying
      });
    }

    yield* put(
      applyDamage({
        damage,
        team: selectedTrooperInfo.team,
        id: selectedTrooperInfo.id
      })
    );
  }

  if (activeTrooper?.attackType === ATTACK_TYPE.MELEE) {
    yield* call(playAttackAnimation, {
      activeTrooperId: activeTrooper.id,
      selectedTrooperInfo,
      damage,
      isDying
    });
  }

  yield* put(attackFinished(selectedTrooperInfo));
}

export function* attackSagaWatcher() {
  yield takeLatest(attackStarted, attack);
}
