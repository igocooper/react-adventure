import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { HoveredElementType, Trooper } from '../types';

export type Element = {
  id: Trooper['id'];
  team: Trooper['team'];
  type: HoveredElementType;
} | null;

type State = {
  element: Element;
};

const initialState: State = { element: null };

export const hoveredElementSlice = createSlice({
  name: 'hoveredElement',
  initialState,
  reducers: {
    setHoveredElement: (state, action: PayloadAction<Element>) => {
      state.element = action.payload;
    }
  }
});

export const { setHoveredElement } = hoveredElementSlice.actions;

export const hoveredElementReducer = hoveredElementSlice.reducer;
