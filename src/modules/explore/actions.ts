import { createAction } from '@reduxjs/toolkit';
import type { Position } from 'common/types';

export {
  setHeroPosition,
  setHeroDirection,
  setHeroIsRunning
} from './reducers/heroReducer';
export { setCameraViewPosition } from './reducers/cameraViewReducer';
export { setLocationBounds, setViewportBounds } from './reducers/uiReducer';

export type MoveHeroPayload = {
  position: Position;
  id: number;
};
export const moveHero = createAction<MoveHeroPayload>('move_hero');
