import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Troop, Team } from 'modules/battlefield/types';
import { ATTACKERS, DEFENDERS } from 'modules/battlefield/constants';

export interface TroopsState {
  attackers: Troop[];
  defenders: Troop[];
}

interface ApplyDamagePayload {
  id: number;
  damage: number;
  team: Team;
}

interface ApplyHealPayload {
  id: number;
  heal: number;
  team: Team;
}

const initialState: TroopsState = {
  attackers: ATTACKERS,
  defenders: DEFENDERS
};

export const troopsSlice = createSlice({
  name: 'troops',
  initialState,
  reducers: {
    applyDamage: (
      state: TroopsState,
      {
        payload: { team, damage, id: targetId }
      }: PayloadAction<ApplyDamagePayload>
    ) => {
      state[team] = state[team].map((troop) => {
        if (troop.id !== targetId) return troop;

        return {
          ...troop,
          currentHealth: troop.currentHealth - damage
        };
      });
    },
    applyHeal: (
      state: TroopsState,
      { payload: { team, heal, id: targetId } }: PayloadAction<ApplyHealPayload>
    ) => {
      state[team] = state[team].map((troop) => {
        if (troop.id !== targetId) return troop;

        return {
          ...troop,
          currentHealth: troop.currentHealth + heal
        };
      });
    }
  }
});

export const { applyDamage, applyHeal } = troopsSlice.actions;

export const troopsReducer = troopsSlice.reducer;
