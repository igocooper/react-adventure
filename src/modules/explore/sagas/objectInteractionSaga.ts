import { takeLatest, select, call } from 'typed-redux-saga/macro';
import {
  objectClicked as objectClickedAction,
  ObjectClickedPayload
} from '../actions';

import { moveCharacterThroughPath } from './moveCharacterSaga';
import {
  gridSelector,
  makeCharacterGridPositionSelector,
  pathFinderSelector
} from '../selectors';
import { HERO_ID } from '../constants';

function* comeToObject(objectProps: { id: number; gridPosition: [number, number] }) {
  const { gridPosition, id } = objectProps;
  const characterGridPosition = yield* select(makeCharacterGridPositionSelector(id));
  const PFGrid = yield* select(gridSelector);
  const pathFinder = yield* select(pathFinderSelector);
  const [row, column] = gridPosition;
  const [characterPositionRow, characterPositionColumn] = characterGridPosition;

  const isWalkable = PFGrid.isWalkableAt(row, column);

  if (!isWalkable) {
    PFGrid.setWalkableAt(row, column, true);

    const fullPath = pathFinder.findPath(
      characterPositionRow,
      characterPositionColumn,
      row,
      column,
      PFGrid.clone()
    );

    const path = fullPath.slice(0, fullPath.length - 1);

    yield* call(moveCharacterThroughPath, {
      payload: {
        id,
        path
      }
    });

    PFGrid.setWalkableAt(row, column, false);
  } else {
    const path = pathFinder.findPath(
      characterPositionRow,
      characterPositionColumn,
      row,
      column,
      PFGrid.clone()
    );

    yield* call(moveCharacterThroughPath, {
      payload: {
        id,
        path
      }
    });
  }
}

function* interactWithObject({ payload }: { payload: ObjectClickedPayload }) {
  yield* call(comeToObject, payload);

  if (payload.cb) {
    yield* call(payload.cb);
  }
}

export function* objectInteractionSagaWatcher() {
  yield takeLatest(objectClickedAction, interactWithObject);
}
