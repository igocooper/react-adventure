import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: string = 'default';

export const cursorSlice = createSlice({
  name: 'cursor',
  initialState,
  reducers: {
    setCursor: (_, action: PayloadAction<string>) => {
      return action.payload;
    }
  }
});

export const { setCursor } = cursorSlice.actions;

export const cursorReducer = cursorSlice.reducer;
