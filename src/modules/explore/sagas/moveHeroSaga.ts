import { takeLatest, put, select, call } from 'typed-redux-saga/macro';
import {
  moveHero as moveHeroAction,
  moveHeroThroughPath as moveHeroThroughPathAction,
  moveCameraView as moveCameraViewAction,
  setCameraViewPosition,
  setHeroDirection as setHeroDirectionAction,
  setHeroGridPosition,
  setHeroIsRunning as setHeroIsRunningAction,
  setHeroPosition
} from '../actions';
import type { MoveHeroPayload, moveHeroThroughPathPayload } from '../actions';
import {
  cameraViewPositionXSelector,
  heroPositionSelector,
  locationBoundsSelector,
  viewportBoundsSelector
} from '../selectors';

import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { CAMERA_SCROLL_STEP, HERO_ID } from '../constants';
import { wait, calculateMoveAnimationTime } from 'common/helpers';
import SFX from 'modules/SFX';

function* moveHeroThroughPath({
  payload
}: {
  payload: moveHeroThroughPathPayload;
}) {
  const { path, id } = payload;
  const cellSize = 100;
  const [_, ...way] = path;

  yield* put(setHeroIsRunningAction(true));

  const heroAnimationInstance = getTrooperAnimationInstance(HERO_ID);
  if (!heroAnimationInstance) return;

  heroAnimationInstance.run();
  SFX.run.play();

  for (const step of way) {
    const [row, column] = step;
    const x = column * cellSize;
    const y = row * cellSize;

    yield* call(moveHero, {
      payload: {
        id,
        position: {
          x: x,
          y
        }
      }
    });
  }

  heroAnimationInstance.idle();
  SFX.run.pause();
  yield* put(setHeroIsRunningAction(false));

  const heroGridPosition = path[path.length - 1];
  if (heroGridPosition) {
    yield* put(setHeroGridPosition(heroGridPosition));
  }
}

function* moveCameraView({ payload: mouseEvent }: { payload: MouseEvent }) {
  const { width: viewportWidth } = yield* select(viewportBoundsSelector);
  const { width: locationWidth } = yield* select(locationBoundsSelector);

  const cameraViewPositionX = yield* select(cameraViewPositionXSelector);

  const maxBgPosition = 0;
  const minBgPosition = viewportWidth - locationWidth;
  const leftScrollArea = viewportWidth / 3;
  const rightScrollArea = (viewportWidth / 3) * 2;

  if (mouseEvent.clientX >= rightScrollArea) {
    yield* put(
      setCameraViewPosition(
        Math.max(cameraViewPositionX - CAMERA_SCROLL_STEP, minBgPosition)
      )
    );
  }

  if (mouseEvent.clientX <= leftScrollArea) {
    yield* put(
      setCameraViewPosition(
        Math.min(cameraViewPositionX + CAMERA_SCROLL_STEP, maxBgPosition)
      )
    );
  }
}

function* moveHero({ payload }: { payload: MoveHeroPayload }) {
  const { position: newPosition } = payload;
  const currentHeroPosition = yield* select(heroPositionSelector);

  const x = newPosition.x;
  const y = newPosition.y;

  if (currentHeroPosition.x > newPosition.x) {
    yield* put(setHeroDirectionAction('left'));
  } else {
    yield* put(setHeroDirectionAction('right'));
  }

  const heroMoveAnimationTime = calculateMoveAnimationTime(
    currentHeroPosition,
    {
      x,
      y
    }
  );

  yield* put(
    setHeroPosition({
      y,
      x
    })
  );

  yield* call(wait, heroMoveAnimationTime);
}

export function* moveHeroSagaWatcher() {
  yield takeLatest(moveHeroAction, moveHero);
  yield takeLatest(moveHeroThroughPathAction, moveHeroThroughPath);
  yield takeLatest(moveCameraViewAction, moveCameraView);
}
