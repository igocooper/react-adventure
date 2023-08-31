import type { RootState } from 'store';
import { createSelector } from 'reselect';

export const exploreSelector = (state: RootState) => state.explore;

export const uiStateSelector = createSelector(
  exploreSelector,
  (explore) => explore.ui
);

export const charactersStateSelector = createSelector(
  exploreSelector,
  (explore) => explore.characters
);

export const gridStateSelector = createSelector(
  exploreSelector,
  (explore) => explore.grid
);

export const cameraViewStateSelector = createSelector(
  exploreSelector,
  (explore) => explore.cameraView
);

export const gridSelector = createSelector(
  gridStateSelector,
  (state) => state.grid
);

export const pathFinderSelector = createSelector(
  gridStateSelector,
  (state) => state.pathFinder
);

export const makeCharacterIsRunningSelector = (id: number) => createSelector(
  charactersStateSelector,
  (characters) => {
    const character = characters[id];

    if (!character) return false;

    return character.isRunning;
  }
);

export const makeCharacterDirectionSelector = (id: number) => createSelector(
  charactersStateSelector,
  (characters) => {
    const character = characters[id];

    if (!character) return 'right';

    return character.direction;
  }
);
export const makeCharacterGridPositionSelector = (id: number) => createSelector(
  charactersStateSelector,
  (characters) => {
    const character = characters[id];

    if (!character) return [0, 0];

    return character.gridPosition;
  }
);

export const makeCharacterPositionSelector = (id: number) => createSelector(
  charactersStateSelector,
  (characters) => {
    const character = characters[id];

    if (!character) return {
      x: 0,
      y: 0,
    };

    return character.position;
  }
);

export const cameraViewPositionXSelector = createSelector(
  cameraViewStateSelector,
  (camera) => camera.positionX
);

export const viewportBoundsSelector = createSelector(
  uiStateSelector,
  (ui) => ui.viewportBounds
);

export const locationBoundsSelector = createSelector(
  uiStateSelector,
  (ui) => ui.locationBounds
);
