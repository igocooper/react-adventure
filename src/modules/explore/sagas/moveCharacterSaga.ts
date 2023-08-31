import {
  takeLatest,
  takeEvery,
  put,
  select,
  call
} from 'typed-redux-saga/macro';
import {
  moveCharacter as moveCharacterAction,
  moveCharacterToGridCell as moveCharacterToGridCellAction,
  moveCameraView as moveCameraViewAction,
  setCameraViewPosition as setCameraViewPositionAction,
  setCharacterDirection as setCharacterDirectionAction,
  setCharacterGridPosition as setCharacterGridPositionAction,
  setCharacterIsRunning as setCharacterIsRunningAction,
  setCharacterPosition as setCharacterPositionAction
} from '../actions';
import type {
  MoveCharacterPayload,
  MoveCharacterToGridCellPayload
} from '../actions';
import {
  cameraViewPositionXSelector,
  makeCharacterPositionSelector,
  locationBoundsSelector,
  viewportBoundsSelector,
  makeCharacterGridPositionSelector,
  gridSelector,
  pathFinderSelector,
  makeCharacterIsRunningSelector
} from '../selectors';

import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { CAMERA_SCROLL_STEP, GRID_CELL_SIZE } from '../constants';
import { wait, calculateMoveAnimationTime } from 'common/helpers';
import SFX from 'modules/SFX';
import PF from 'pathfinding';

export function* moveCharacterToGridCell({
  payload
}: {
  payload: MoveCharacterToGridCellPayload;
}) {
  const { gridCell, id } = payload;
  const characterGridPosition = yield* select(
    makeCharacterGridPositionSelector(id)
  );
  const PFGrid = yield* select(gridSelector);
  const pathFinder = yield* select(pathFinderSelector);
  const isRunning = yield* select(makeCharacterIsRunningSelector(id));
  const [characterPositionRow, characterPositionColumn] = characterGridPosition;
  const [destinationRow, destinationColumn] = gridCell;

  if (
    !PFGrid ||
    !pathFinder ||
    characterPositionRow === undefined ||
    characterPositionColumn === undefined ||
    destinationRow === undefined ||
    destinationColumn === undefined ||
    isRunning
  ) {
    return;
  }

  const path = pathFinder.findPath(
    characterPositionRow,
    characterPositionColumn,
    destinationRow,
    destinationColumn,
    PFGrid.clone()
  );

  const compressedPath = PF.Util.compressPath(path);

  yield* put(setCharacterIsRunningAction({ id, isRunning: true }));

  // TODO: where to get instances from?
  const characterAnimationInstance = getTrooperAnimationInstance(id);
  if (!characterAnimationInstance) return;

  characterAnimationInstance.run();
  const runSFX: HTMLAudioElement = SFX.run.cloneNode() as HTMLAudioElement;
  void runSFX.play();

  for (const step of compressedPath) {
    const [row, column] = step;

    if (row === undefined || column === undefined) {
      continue;
    }

    const x = column * GRID_CELL_SIZE;
    const y = row * GRID_CELL_SIZE;

    yield* call(moveCharacter, {
      payload: {
        id,
        position: {
          x: x,
          y
        }
      }
    });
  }

  characterAnimationInstance.idle();
  void runSFX.pause();

  yield* put(setCharacterIsRunningAction({ id, isRunning: false }));

  const heroGridPosition = path[path.length - 1];
  if (heroGridPosition) {
    yield* put(
      setCharacterGridPositionAction({ id, position: heroGridPosition })
    );
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
      setCameraViewPositionAction(
        Math.max(cameraViewPositionX - CAMERA_SCROLL_STEP, minBgPosition)
      )
    );
  }

  if (mouseEvent.clientX <= leftScrollArea) {
    yield* put(
      setCameraViewPositionAction(
        Math.min(cameraViewPositionX + CAMERA_SCROLL_STEP, maxBgPosition)
      )
    );
  }
}

function* moveCharacter({ payload }: { payload: MoveCharacterPayload }) {
  const { id, position: newPosition } = payload;
  const currentHeroPosition = yield* select(makeCharacterPositionSelector(id));

  const x = newPosition.x;
  const y = newPosition.y;

  if (currentHeroPosition.x > newPosition.x) {
    yield* put(setCharacterDirectionAction({ id, direction: 'left' }));
  } else {
    yield* put(setCharacterDirectionAction({ id, direction: 'right' }));
  }

  const characterMoveAnimationTime = calculateMoveAnimationTime(
    currentHeroPosition,
    {
      x,
      y
    }
  );

  yield* put(
    setCharacterPositionAction({
      id,
      position: {
        y,
        x
      }
    })
  );

  yield* call(wait, characterMoveAnimationTime);
}

export function* moveCharacterSagaWatcher() {
  yield takeEvery(moveCharacterAction, moveCharacter);
  yield takeEvery(moveCharacterToGridCellAction, moveCharacterToGridCell);
  yield takeLatest(moveCameraViewAction, moveCameraView);
}
