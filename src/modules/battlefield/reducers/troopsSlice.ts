import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Trooper, Team } from 'modules/battlefield/types';
import { ATTACKERS, DEFENDERS } from 'modules/battlefield/constants';

export interface TroopsState {
  attackers: Trooper[];
  defenders: Trooper[];
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
  name: 'troopers',
  initialState,
  reducers: {
    setTrooperCurrentTargetId: (
      state: TroopsState,
      {
        payload: { currentTargetId, activeTrooperId, team }
      }: PayloadAction<{
        team: Trooper['team'];
        activeTrooperId: Trooper['id'];
        currentTargetId: Trooper['currentTargetId'];
      }>
    ) => {
      const activeTrooper = state[team].find(
        (trooper) => trooper.id === activeTrooperId
      );

      if (activeTrooper) {
        activeTrooper.currentTargetId = currentTargetId;
      }
    },
    applyDamage: (
      state: TroopsState,
      {
        payload: { team, damage, id: targetId }
      }: PayloadAction<ApplyDamagePayload>
    ) => {
      const targetTrooper = state[team].find(
        (trooper) => trooper.id === targetId
      );

      if (targetTrooper != null) {
        targetTrooper.currentHealth -= damage;
      }
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

export const { applyDamage, applyHeal, setTrooperCurrentTargetId } =
  troopsSlice.actions;

export const troopsReducer = troopsSlice.reducer;
