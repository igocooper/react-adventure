import type { RootState } from 'store';
import { createSelector } from 'reselect';

export const exploreSelector = (state: RootState) => state.explore;
export const locationStateSelector = createSelector(
  exploreSelector,
  (explore) => explore.location
);
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

export const makeCharacterIsRunningSelector = (id: number) =>
  createSelector(charactersStateSelector, (characters) => {
    const character = characters[id];

    if (!character) return false;

    return character.isRunning;
  });

export const makeCharacterFollowersSelector = (id: number) =>
  createSelector(charactersStateSelector, (characters) => {
    const character = characters[id];

    if (!character) return undefined;

    return character.followers;
  });

export const makeCharacterDirectionSelector = (id: number) =>
  createSelector(charactersStateSelector, (characters) => {
    const character = characters[id];

    if (!character) return 'right';

    return character.direction;
  });
export const makeCharacterGridPositionSelector = (id: number) =>
  createSelector(charactersStateSelector, (characters) => {
    const character = characters[id];

    if (!character) return [0, 0];

    return character.gridPosition;
  });

export const makeCharacterPositionSelector = (id: number) =>
  createSelector(charactersStateSelector, (characters) => {
    const character = characters[id];

    if (!character)
      return {
        x: 0,
        y: 0
      };

    return character.position;
  });

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
export const locationSelector = createSelector(
  locationStateSelector,
  (state) => state.location
);

export const locationIsLoadingSelector = createSelector(
  locationStateSelector,
  (state) => state.isLoading
);

export const locationInitializedSelector = createSelector(
  locationStateSelector,
  (state) => state.initialized
);

export const locationMetaSelector = createSelector(
  locationSelector,
  (location) => location.meta
);
