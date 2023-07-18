import type { RootState } from 'store';
import { createSelector } from 'reselect';

export const dialogsStateSelector = (state: RootState) => state.dialogs;

export const dialogTypeSelector = createSelector(
  dialogsStateSelector,
  (state) => state.type
);

export const dialogPropsSelector = createSelector(
  dialogsStateSelector,
  (state) => state.dialogProps
);
