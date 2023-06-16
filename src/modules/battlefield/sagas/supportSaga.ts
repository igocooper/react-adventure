import { takeLatest, put } from 'typed-redux-saga/macro';
import { supportStarted, supportFinished, applyHeal } from '../actions';

import type { Trooper } from '../types';

function* support({
  payload: selectedTrooperInfo
}: {
  payload: Pick<Trooper, 'id' | 'team'>;
}) {
  // TODO: calc heal and extend supports types
  yield* put(
    applyHeal({
      heal: 10,
      team: selectedTrooperInfo.team,
      id: selectedTrooperInfo.id
    })
  );

  yield* put(supportFinished(selectedTrooperInfo));
}

export function* suportSagaWatcher() {
  yield takeLatest(supportStarted, support);
}
