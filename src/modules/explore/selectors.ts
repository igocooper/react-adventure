import type { RootState } from 'store';
import { createSelector } from 'reselect';

export const exploreSelector = (state: RootState) => state.explore;

export const uiStateSelector = createSelector(
  exploreSelector,
  (explore) => explore.ui
);

export const heroStateSelector = createSelector(
  exploreSelector,
  (explore) => explore.hero
);

export const cameraViewStateSelector = createSelector(
  exploreSelector,
  (explore) => explore.cameraView
);

export const heroIsRunningSelector = createSelector(
  heroStateSelector,
  (hero) => hero.isRunning
);

export const heroDirectionSelector = createSelector(
  heroStateSelector,
  (hero) => hero.direction
);

export const heroGridPositionSelector = createSelector(
  heroStateSelector,
  (hero) => hero.gridPosition
);

export const heroPositionSelector = createSelector(
  heroStateSelector,
  (hero) => hero.position
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
