import { takeLatest, select, call } from 'typed-redux-saga/macro';
import {
  objectClicked as objectClickedAction,
  ObjectClickedPayload
} from '../actions';

import { moveCharacterToGridCell } from './moveCharacterSaga';
import {
  gridSelector,
  makeCharacterGridPositionSelector,
  pathFinderSelector
} from '../selectors';

function* comeToObject(objectProps: {
  id: number;
  gridPosition: [number, number];
}) {
  const { gridPosition, id } = objectProps;
  const characterGridPosition = yield* select(
    makeCharacterGridPositionSelector(id)
  );
  const PFGrid = yield* select(gridSelector);
  const pathFinder = yield* select(pathFinderSelector);
  const [row, column] = gridPosition;
  const [characterPositionRow, characterPositionColumn] = characterGridPosition;

  if (
    !PFGrid ||
    !pathFinder ||
    characterPositionRow === undefined ||
    characterPositionColumn === undefined
  )
    return;


  const isWalkable = PFGrid.isWalkableAt(row, column);

  if (!isWalkable) {
    PFGrid.setWalkableAt(row, column, true);

    const path = pathFinder.findPath(
      characterPositionRow,
      characterPositionColumn,
      row,
      column,
      PFGrid.clone()
    );

    const targetGridCell = path[path.length - 2];

    if (targetGridCell) {
      
    yield *
      call(moveCharacterToGridCell, {
        payload: {
          id,
          gridCell: targetGridCell
        }
      });
    }

    PFGrid.setWalkableAt(row, column, false);
  } else {
    const path = pathFinder.findPath(
      characterPositionRow,
      characterPositionColumn,
      row,
      column,
      PFGrid.clone()
    );
    
    const targetCell = path[path.length - 1];

    if (targetCell) {
    yield* call(moveCharacterToGridCell, {
      payload: {
        id,
        gridCell: targetCell,
      }
    });
      
    }
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
