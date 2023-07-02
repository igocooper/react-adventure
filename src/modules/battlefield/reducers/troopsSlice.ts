import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  Trooper,
  Team,
  EffectName,
  Effect
} from 'modules/battlefield/types';
import { ATTACKERS, DEFENDERS } from 'modules/battlefield/constants';

export interface TroopsState {
  attackers: Trooper[];
  defenders: Trooper[];
}

interface ApplyDamagePayload {
  id: number;
  damage: number;
  team: Team;
  isEvading?: boolean;
  isCriticalDamage?: boolean;
  isPoison?: boolean;
}

interface ApplyHealPayload {
  id: number;
  heal: number;
  team: Team;
}

interface SetEffectDurationPayload {
  id: number;
  duration: number;
  name: EffectName;
  team: Team;
}

interface SetEffectDonePayload {
  id: number;
  value: boolean;
  name: EffectName;
  team: Team;
}

interface RemoveEffectPayload {
  id: number;
  name: EffectName;
  team: Team;
}

interface AddEffectPayload {
  id: number;
  effect: Effect;
  team: Team;
}

interface ModifyTrooperPayload {
  id: number;
  team: Team;
  updates: Partial<Trooper>;
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
    },
    setEffectDuration: (
      state: TroopsState,
      action: PayloadAction<SetEffectDurationPayload>
    ) => {
      const { team, id, name, duration } = action.payload;
      const trooper = state[team]?.find((target) => target.id === id);
      const effect = trooper!.effects.find((target) => target.name === name);

      if (effect) {
        effect.duration = duration;
      }
    },
    setEffectDone: (
      state: TroopsState,
      action: PayloadAction<SetEffectDonePayload>
    ) => {
      const { team, id, name, value } = action.payload;
      const trooper = state[team]?.find((target) => target.id === id);
      const effect = trooper!.effects.find((target) => target.name === name);

      if (effect) {
        effect.done = value;
      }
    },

    removeEffect: (state, action: PayloadAction<RemoveEffectPayload>) => {
      const { team, id, name } = action.payload;
      return {
        ...state,
        [team]: state[team].map((trooper) => {
          if (trooper.id === id) {
            return {
              ...trooper,
              effects: trooper.effects.filter((effect) => effect.name !== name)
            };
          }
          return trooper;
        })
      };
    },

    addEffect: (state, action: PayloadAction<AddEffectPayload>) => {
      const { team, id, effect } = action.payload;

      return {
        ...state,
        [team]: state[team].map((trooper) => {
          if (trooper.id === id) {
            const existingEffect = trooper.effects.find(
              (target) => target.name === effect.name
            );
            // TODO: think more about complex effect merging
            if (existingEffect) {
              return trooper;
            }

            return {
              ...trooper,
              effects: [...trooper.effects, effect]
            };
          }
          return trooper;
        })
      };
    },

    modifyTrooper: (state, action: PayloadAction<ModifyTrooperPayload>) => {
      const { team, id, updates } = action.payload;
      return {
        ...state,
        [team]: state[team].map((trooper) => {
          if (trooper.id === id) {
            return {
              ...trooper,
              ...updates
            };
          }

          return trooper;
        })
      };
    }
  }
});

export const {
  applyDamage,
  applyHeal,
  setTrooperCurrentTargetId,
  removeEffect,
  addEffect,
  setEffectDuration,
  modifyTrooper,
  setEffectDone
} = troopsSlice.actions;

export const troopsReducer = troopsSlice.reducer;
