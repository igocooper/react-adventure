import { takeLatest, call } from 'typed-redux-saga/macro';
import { pushNextUrl as pushNextUrlAction, goBackAction } from './actions';
import { history } from './history';

function* pushNextUrl({ payload }: { payload: string }) {
  yield* call(history.push, {
    pathname: payload,
    search: window.location.search
  });
}

function* goBack() {
  yield* call([history, 'back']);
}

export function* routerSagaWatcher() {
  yield takeLatest(pushNextUrlAction, pushNextUrl);
  yield takeLatest(goBackAction, goBack);
}
