import { all, fork } from 'typed-redux-saga/macro';
import { routerSagaWatcher } from 'modules/router/routerSaga';
import { cursorSagaWatcher } from 'modules/battlefield/sagas/cursorSaga';
import { roundSagaWatcher } from 'modules/battlefield/sagas/roundSaga';
import { attackSagaWatcher } from '../modules/battlefield/sagas/attackSaga';
import { AISagaWatcher } from '../modules/battlefield/sagas/AISaga';
import { initSagaWatcher } from '../modules/battlefield/sagas/initSaga';
import { damageEventsSagaWatcher } from '../modules/battlefield/sagas/damageEventsSaga';
import { bloodSagaWatcher } from '../modules/battlefield/sagas/bloodSaga';
import { skillsSagaWatcher } from '../modules/battlefield/sagas/skillsSaga';
import { moveCharacterSagaWatcher } from '../modules/explore/sagas/moveCharacterSaga';
import { objectInteractionSagaWatcher } from '../modules/explore/sagas/objectInteractionSaga';

export function* rootSaga() {
  yield* all([
    fork(roundSagaWatcher),
    fork(cursorSagaWatcher),
    fork(routerSagaWatcher),
    fork(attackSagaWatcher),
    fork(AISagaWatcher),
    fork(initSagaWatcher),
    fork(damageEventsSagaWatcher),
    fork(bloodSagaWatcher),
    fork(skillsSagaWatcher),
    fork(moveCharacterSagaWatcher),
    fork(objectInteractionSagaWatcher)
  ]);
}
