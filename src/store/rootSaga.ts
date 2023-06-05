import { all, fork } from 'typed-redux-saga/macro';
import { routerSagaWatcher } from 'modules/router/routerSaga';

export function* rootSaga() {
  yield* all([fork(routerSagaWatcher)]);
}
