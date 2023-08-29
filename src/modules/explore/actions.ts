import { createAction } from '@reduxjs/toolkit';
import type { Position } from 'common/types';

export {
  setHeroPosition,
  setHeroDirection,
  setHeroIsRunning,
  setHeroGridPosition
} from './reducers/heroReducer';
export { setCameraViewPosition } from './reducers/cameraViewReducer';
export { setLocationBounds, setViewportBounds } from './reducers/uiReducer';

export type MoveHeroPayload = {
  position: Position;
  id: number;
};

export type moveHeroThroughPathPayload = {
  path: Array<[number, number]>;
  id: number;
};
export const moveHero = createAction<MoveHeroPayload>('move_hero');
export const moveCameraView = createAction<MouseEvent>('move_camera_view');
export const moveHeroThroughPath = createAction<moveHeroThroughPathPayload>('move_hero_through_path');
