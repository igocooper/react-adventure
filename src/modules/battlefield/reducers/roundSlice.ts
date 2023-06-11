import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PlayerInfo {
  id: number;
  index: number;
}

interface State {
  round: number;
  initiative: PlayerInfo[];
  activePlayer: PlayerInfo;
}

const initialState = {
  round: 0,
  initiative: [],
  activePlayer: { id: 0, index: 0 }
};

export const roundSlice = createSlice({
  name: 'round',
  initialState,
  reducers: {
    setInitiative: (state: State, action: PayloadAction<PlayerInfo[]>) => {
      state.initiative = action.payload;
    },
    setRound: (state: State, action: PayloadAction<number>) => {
      state.round = action.payload;
    },
    setActivePlayer: (state: State, action: PayloadAction<PlayerInfo>) => {
      state.activePlayer = action.payload;
    }
  }
});

export const { setInitiative, setRound, setActivePlayer } = roundSlice.actions;

export const roundReducer = roundSlice.reducer;