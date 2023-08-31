import { createAction } from '@reduxjs/toolkit';
import type { Position } from 'common/types';

export {
  addCharacter,
  setCharacterPosition,
  setCharacterGridPosition,
  setCharacterDirection,
  setCharacterIsRunning,
  addFollowers
} from './reducers/charactersReducer';
export { setCameraViewPosition } from './reducers/cameraViewReducer';
export { setLocationBounds, setViewportBounds } from './reducers/uiReducer';

export type MoveCharacterPayload = {
  position: Position;
  id: number;
};

export type MoveCharacterToGridCellPayload = {
  gridCell: number[];
  id: number;
};

export type ObjectClickedPayload = {
  id: number;
  cb?: CallableFunction;
  gridPosition: [number, number];
};

export const moveCharacter = createAction<MoveCharacterPayload>('move_character');
export const objectClicked =
  createAction<ObjectClickedPayload>('object_clicked');
export const moveCameraView = createAction<MouseEvent>('move_camera_view');
export const moveCharacterToGridCell = createAction<MoveCharacterToGridCellPayload>(
  'move_character_to_grid_cell'
);
