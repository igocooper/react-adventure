import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Trooper } from '../types';

interface State {
  loadedTroopersIds: Record<Trooper['id'], boolean>;
  isLoaded: boolean;
}

const initialState: State = {
  loadedTroopersIds: {},
  isLoaded: false
};

export const battlefieldLoadedStatusSlice = createSlice({
  name: 'battlefieldLoadedStatus',
  initialState,
  reducers: {
    setBattlefieldLoadedStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
    setTrooperLoadedStatus: (
      state: State,
      action: PayloadAction<Trooper['id']>
    ) => {
      state.loadedTroopersIds[action.payload] = true;
    },
    setTroopersToLoad: (
      state: State,
      action: PayloadAction<Record<Trooper['id'], boolean>>
    ) => {
      state.loadedTroopersIds = action.payload;
    },
    resetBattlefieldLoadedStatus: () => {
      return initialState;
    }
  }
});

export const {
  setBattlefieldLoadedStatus,
  setTrooperLoadedStatus,
  resetBattlefieldLoadedStatus,
  setTroopersToLoad
} = battlefieldLoadedStatusSlice.actions;

export const battlefieldLoadedStatusReducer =
  battlefieldLoadedStatusSlice.reducer;
