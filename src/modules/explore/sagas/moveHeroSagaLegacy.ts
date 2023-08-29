import { takeLatest, put, select, call } from 'typed-redux-saga/macro';
import {
  moveHero as moveHeroAction,
  setCameraViewPosition,
  setHeroDirection as setHeroDirectionAction,
  setHeroIsRunning as setHeroIsRunningAction,
  setHeroPosition
} from '../actions';
import type { MoveHeroPayload } from '../actions';
import {
  cameraViewPositionXSelector,
  locationBoundsSelector,
  viewportBoundsSelector
} from '../selectors';

import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { CAMERA_SCROLL_STEP, HERO_ID } from '../constants';
import { wait, calculateMoveAnimationTime } from 'common/helpers';
import SFX from 'modules/SFX';
import { getTrooperNode } from 'modules/battlefield/troopersNodesMap';

function* moveHero({ payload }: { payload: MoveHeroPayload }) {
  const { id, position: newPosition } = payload;
  const heroNode = getTrooperNode(id);
  const heroBounds = heroNode!.getBoundingClientRect();
  const { width: viewportWidth } = yield* select(viewportBoundsSelector);
  const { width: locationWidth } = yield* select(locationBoundsSelector);

  const cameraViewPositionX = yield* select(cameraViewPositionXSelector);

  yield* put(setHeroIsRunningAction(true));

  const maxBgPosition = 0;
  const minBgPosition = viewportWidth - locationWidth;
  const leftScrollArea = viewportWidth / 3;
  const rightScrollArea = (viewportWidth / 3) * 2;

  const x = newPosition.x - heroBounds.width / 2;
  const y = newPosition.y - heroBounds.height / 2;

  if (heroBounds.x + heroBounds.width / 2 > newPosition.x) {
    yield* put(setHeroDirectionAction('left'));
  } else {
    yield* put(setHeroDirectionAction('right'));
  }

  const heroAnimationInstance = getTrooperAnimationInstance(HERO_ID);
  if (!heroAnimationInstance) return;

  heroAnimationInstance.run();
  SFX.run.play();

  if (newPosition.x >= rightScrollArea) {
    yield* put(
      setCameraViewPosition(
        Math.max(cameraViewPositionX - CAMERA_SCROLL_STEP, minBgPosition)
      )
    );
  }

  if (newPosition.x <= leftScrollArea) {
    yield* put(
      setCameraViewPosition(
        Math.min(cameraViewPositionX + CAMERA_SCROLL_STEP, maxBgPosition)
      )
    );
  }

  const heroMoveAnimationTime = calculateMoveAnimationTime(heroBounds, {
    x,
    y
  });

  yield* put(
    setHeroPosition({
      y,
      x: x - cameraViewPositionX
    })
  );

  yield* call(wait, heroMoveAnimationTime);
  heroAnimationInstance.idle();
  SFX.run.pause();
  yield* put(setHeroIsRunningAction(false));
}

export function* moveHeroSagaWatcher() {
  yield takeLatest(moveHeroAction, moveHero);
}
