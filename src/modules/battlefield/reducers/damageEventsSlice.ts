import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DamageEvent {
  id: number;
  damage: number;
  isEvading?: boolean;
  isCriticalDamage?: boolean;
  isPoison?: boolean;
  position: {
    x: number;
    y: number;
  };
}

const initialState: DamageEvent[] = [];

export const damageEventsSlice = createSlice({
  name: 'damageEvents',
  initialState,
  reducers: {
    addDamageEvent: (state, action: PayloadAction<DamageEvent>) => {
      state.push(action.payload);
    },
    resetDamageEvents: (state) => {
      return state.slice(-1);
    }
  }
});

export const { addDamageEvent, resetDamageEvents } = damageEventsSlice.actions;

export const damageEventsReducer = damageEventsSlice.reducer;