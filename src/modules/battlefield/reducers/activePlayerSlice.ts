import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type State = {
  id: number;
  index: number;
};
const initialState: State = { id: 0, index: 0 };

export const activePlayerSlice = createSlice({
  name: 'activePlayer',
  initialState,
  reducers: {
    setActivePlayer: (_, action: PayloadAction<State>) => {
      return action.payload;
    }
  }
});

export const { setActivePlayer } = activePlayerSlice.actions;

export const activePlayerReducer = activePlayerSlice.reducer;
