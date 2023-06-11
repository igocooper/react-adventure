import type { RootState } from 'store';
import { createSelector } from 'reselect';

export const battlefieldSelector = (state: RootState) => state.battleField;

export const initiativesSelector = createSelector(
  battlefieldSelector,
  (battleField) => battleField.initiatives
);

export const activePlayerSelector = createSelector(
  battlefieldSelector,
  (battleField) => battleField.activePlayer
);

export const activePlayerIdSelector = createSelector(
  activePlayerSelector,
  (activePlayer) => activePlayer.id
);

export const activePlayerIndexSelector = createSelector(
  activePlayerSelector,
  (activePlayer) => activePlayer.index
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

export const makeCharacterByIdSelector = (id: number) =>
  createSelector(
    troopsSelector,
    (troops) =>
      troops.attackers.find((attacker) => attacker.id === id) ||
      troops.defenders.find((defender) => defender.id === id)
  );

export const uiSelector = createSelector(
  battlefieldSelector,
  (battleField) => battleField.ui
);

export const hoveredElementSelector = createSelector(
  uiSelector,
  (ui) => ui.hoveredElement
);

export const cursorSelector = createSelector(uiSelector, (ui) => ui.cursor);

export const battlefieldDisabledStatusSelector = createSelector(
  uiSelector,
  (ui) => ui.battlefieldDisabledStatus
);
