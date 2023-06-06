import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const initiativesSlice = createSlice({
  name: 'initiative',
  initialState,
  reducers: {
    setInitiative: (_, action: PayloadAction<string[]>) => {
      return action.payload;
    }
  }
});

export const { setInitiative } = initiativesSlice.actions;

export const initiativesReducer = initiativesSlice.reducer;
