import { call, select } from 'typed-redux-saga/macro';
import { applyDamage } from '../../actions';
import { takeEvery } from 'typed-redux-saga';
import {
  activeTrooperSelector,
  makeCharacterByIdSelector
} from '../../selectors';
import type { Trooper } from '../../types';

export function* applyAbilities({
  payload: { id }
}: {
  payload: {
    id: Trooper['id'];
  };
}) {
  const targetTrooper = yield* select(makeCharacterByIdSelector(id));
  const activeTrooper = yield* select(activeTrooperSelector);
  if (!targetTrooper || !activeTrooper) return;

  const { abilities } = activeTrooper;

  for (const ability of abilities) {
    yield* call([ability, 'applyAbility'], { targetTrooper });
  }
}

export function* abilitiesSagaWatcher() {
  yield takeEvery(applyDamage, applyAbilities);
}