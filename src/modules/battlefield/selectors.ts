import { type RootState } from 'store';
import { createSelector } from 'reselect';

export const battlefieldSelector = (state: RootState) => state.battleField;

export const initiativesSelector = createSelector(
  battlefieldSelector,
  (battleField) => battleField.initiatives
);

export const troopsSelector = createSelector(
  battlefieldSelector,
  (battleField) => battleField.troops
);

export const attackersSelector = createSelector(
  troopsSelector,
  (troops) => troops.attackers
);

export const defendersSelector = createSelector(
  troopsSelector,
  (troops) => troops.defenders
);
