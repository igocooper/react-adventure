import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Trooper, Team, Effect } from 'modules/battlefield/types';
import { ATTACKERS, DEFENDERS } from 'modules/battlefield/constants';
import type { DamageType } from 'common/types';
import { addBaseTrooperProperties } from '../helpers/addBaseTrooperProperties';

export type TroopsState = {
  attackers: Trooper[];
  defenders: Trooper[];
};

type ApplyDamagePayload = {
  id: number;
  damage: number;
  damageType: DamageType;
  team: Team;
  hasMissed?: boolean;
  isCriticalDamage?: boolean;
};

type ApplyHealPayload = {
  id: number;
  heal: number;
  team: Team;
};

type SetEffectDurationPayload = {
  id: number;
  duration: number;
  effectId: number;
  team: Team;
};

type SetEffectDonePayload = {
  id: number;
  value: boolean;
  effectId: number;
  team: Team;
};

type RemoveEffectPayload = {
  id: number;
  effectId: number;
  team: Team;
};

type RemoveAllEffectPayload = {
  id: number;
  team: Team;
};

type AddEffectPayload = {
  id: number;
  effect: Effect;
  team: Team;
};

type SetSkillCoolDownPayload = {
  id: number;
  team: Team;
  name: string;
  value: number;
};

type ModifyTrooperPayload = {
  id: number;
  team: Team;
  updates: Partial<Trooper>;
};

const initialState: TroopsState = {
  attackers: ATTACKERS,
  defenders: DEFENDERS
};

export const troopsSlice = createSlice({
  name: 'troopers',
  initialState,
  reducers: {
    setTroopers: (_, { payload }: PayloadAction<TroopsState>) => {
      return {
        attackers: addBaseTrooperProperties(payload.attackers),
        defenders: addBaseTrooperProperties(payload.defenders)
      };
    },
    setTrooperCurrentTargetId: (
      state,
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
      state,
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
      state,
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
      state,
      action: PayloadAction<SetEffectDurationPayload>
    ) => {
      const { team, id, effectId, duration } = action.payload;
      const trooper = state[team]?.find((target) => target.id === id);
      const effect = trooper!.effects.find((target) => target.id === effectId);

      if (effect) {
        effect.duration = duration;
      }
    },
    setEffectDone: (state, action: PayloadAction<SetEffectDonePayload>) => {
      const { team, id, effectId, value } = action.payload;
      const trooper = state[team]?.find((target) => target.id === id);
      const effect = trooper!.effects.find((target) => target.id === effectId);

      if (effect) {
        effect.done = value;
      }
    },

    removeEffect: (state, action: PayloadAction<RemoveEffectPayload>) => {
      const { team, id, effectId } = action.payload;
      return {
        ...state,
        [team]: state[team].map((trooper) => {
          if (trooper.id === id) {
            return {
              ...trooper,
              effects: trooper.effects.filter(
                (effect) => effect.id !== effectId
              )
            };
          }
          return trooper;
        })
      };
    },

    removeAllEffects: (
      state,
      action: PayloadAction<RemoveAllEffectPayload>
    ) => {
      const { team, id } = action.payload;
      return {
        ...state,
        [team]: state[team].map((trooper) => {
          if (trooper.id === id) {
            return {
              ...trooper,
              effects: []
            };
          }
          return trooper;
        })
      };
    },

    setSkillCoolDown: (
      state,
      action: PayloadAction<SetSkillCoolDownPayload>
    ) => {
      const { id, team, value, name } = action.payload;

      return {
        ...state,
        [team]: state[team].map((trooper) => {
          if (trooper.id === id) {
            return {
              ...trooper,
              skills: {
                ...trooper.skills,
                [name]: {
                  ...trooper.skills[name],
                  currentCoolDown: value
                }
              }
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

            // new effect should override previous one
            if (existingEffect && effect.stacks === false) {
              // cancel effect which will be overwritten
              if (existingEffect.cancelEffect) {
                existingEffect.cancelEffect();
              }

              return {
                ...trooper,
                effects: [
                  ...trooper.effects.filter(
                    (effect) => effect.id !== existingEffect.id
                  ),
                  effect
                ]
              };
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
  setTroopers,
  applyDamage,
  applyHeal,
  setTrooperCurrentTargetId,
  removeEffect,
  removeAllEffects,
  addEffect,
  setEffectDuration,
  modifyTrooper,
  setEffectDone,
  setSkillCoolDown
} = troopsSlice.actions;

export const troopsReducer = troopsSlice.reducer;
