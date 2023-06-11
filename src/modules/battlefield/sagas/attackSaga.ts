import { takeLatest, put } from 'typed-redux-saga/macro';
import { attackStarted, attackFinished } from '../actions';

import type { Trooper } from '../types';

function* attack({ payload }: { payload: Pick<Trooper, 'id' | 'team'> }) {
  yield* put(attackFinished(payload));
}

export function* attackSagaWatcher() {
  yield takeLatest(attackStarted, attack);
}
