import { all, fork } from 'typed-redux-saga/macro';
import { routerSagaWatcher } from 'modules/router/routerSaga';
import { cursorSagaWatcher } from 'modules/battlefield/sagas/cursorSaga';
import { roundSagaWatcher } from 'modules/battlefield/sagas/roundSaga';
import { attackSagaWatcher } from '../modules/battlefield/sagas/attackSaga';

export function* rootSaga() {
  yield* all([
    fork(roundSagaWatcher),
    fork(cursorSagaWatcher),
    fork(routerSagaWatcher),
    fork(attackSagaWatcher)
  ]);
}
