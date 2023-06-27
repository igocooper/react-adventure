import { takeLatest, put, select } from 'typed-redux-saga/macro';
import {
  setTrooperLoadedStatus,
  setBattlefieldLoadedStatus as setBattlefieldLoadedStatusAction
} from '../actions';
import { troopersToLoadSelector } from '../selectors';

function* setBattlefieldLoadedStatus() {
  const troopersToLoad = yield* select(troopersToLoadSelector);

  if (Object.values(troopersToLoad).every(Boolean)) {
    yield* put(setBattlefieldLoadedStatusAction(true));
  }
}

export function* initSagaWatcher() {
  yield takeLatest(setTrooperLoadedStatus, setBattlefieldLoadedStatus);
}
