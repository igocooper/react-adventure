import { takeLatest, put, call } from 'typed-redux-saga/macro';
import {
  initLocation as initLocationAction,
  setIsLoading as setIsLoadingAction,
  setInitialized as setInitializedAction,
  setLocation
} from '../actions';
import { locationService } from 'modules/explore/services/locationService';
import { getImageSize } from 'common/helpers';
import { getWidthPreserveRatio } from '../helpers/getWidthPreserveRatio';

function* initLocation({ payload: locationName }: { payload: string }) {
  yield* put(setIsLoadingAction(true));
  const location = yield* call(locationService.getLocation, locationName);

  const { backgroundSrc } = location;

  const originalBgBounds = yield* call(getImageSize, backgroundSrc);

  const scale = window.innerHeight / originalBgBounds.height;
  const bgWidth = yield* call(
    getWidthPreserveRatio,
    originalBgBounds.width / originalBgBounds.height,
    window.innerHeight
  );
  const bgSize = `${bgWidth}px ${window.innerHeight}px`;

  yield* put(
    setLocation({
      ...location,
      meta: {
        bgSize,
        scale,
        bgWidth,
        originalBgWidth: originalBgBounds.width
      }
    })
  );

  yield* put(setIsLoadingAction(false));
  yield* put(setInitializedAction(true));
}

export function* locationSagaWatcher() {
  yield takeLatest(initLocationAction, initLocation);
}
