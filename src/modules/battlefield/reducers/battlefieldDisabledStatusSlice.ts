import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: boolean = false;

export const battlefieldDisabledStatus = createSlice({
  name: 'battlefieldDisabledStatus',
  initialState,
  reducers: {
    setBattlefieldStatus: (_, action: PayloadAction<boolean>) => {
      return action.payload;
    },
    toggleBattlefieldStatus: (state) => {
      return !state;
    }
  }
});

export const { setBattlefieldStatus, toggleBattlefieldStatus } =
  battlefieldDisabledStatus.actions;

export const battlefieldDisabledStatusReducer =
  battlefieldDisabledStatus.reducer;
