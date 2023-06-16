import { takeLatest, put, select } from 'typed-redux-saga/macro';
import { attackStarted, attackFinished, applyDamage } from '../actions';

import type { Trooper } from '../types';
import {
  activeTrooperSelector,
  attackersSelector,
  defendersSelector,
  makeCharacterByIdSelector
} from '../selectors';
import { getRandomNumberInRange } from '../helpers/getRandomNumberInRange';
import { ATTACK_TYPE, TROOPER_TEAM } from '../constants';

const calculateDamage = (selectedTrooper: Trooper, activeTrooper: Trooper) => {
  const [minDamage, maxDamage] = activeTrooper.damage.split('-');
  let isDying = false;
  let damage = getRandomNumberInRange(
    parseInt(minDamage!, 10),
    parseInt(maxDamage!, 10)
  );

  if (damage >= selectedTrooper.currentHealth) {
    damage = damage - (damage - selectedTrooper.currentHealth);
    isDying = true;
  }

  return { damage, isDying };
};

function* attack({
  payload: selectedTrooperInfo
}: {
  payload: Pick<Trooper, 'id' | 'team'>;
}) {
  const activeTrooper = yield* select(activeTrooperSelector);
  const selectedTrooper = yield* select(
    makeCharacterByIdSelector(selectedTrooperInfo.id)
  );
  const { damage } = calculateDamage(selectedTrooper!, activeTrooper!);

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

  yield* put(
    applyDamage({
      damage,
      team: selectedTrooperInfo.team,
      id: selectedTrooperInfo.id
    })
  );

  yield* put(attackFinished(selectedTrooperInfo));
}

export function* attackSagaWatcher() {
  yield takeLatest(attackStarted, attack);
}
