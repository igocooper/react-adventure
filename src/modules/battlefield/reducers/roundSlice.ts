import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Skill } from 'common/types';

type PlayerInfo = {
  id: number;
  index: number;
};

export type ActiveSkill = Nullable<Skill>;

type State = {
  round: number;
  initiative: PlayerInfo[];
  activePlayer: PlayerInfo;
  activeSkill: ActiveSkill;
  usedSkills: string[];
  addedEffects: string[];
};

const initialState = {
  round: 0,
  initiative: [] as PlayerInfo[],
  usedSkills: [] as string[],
  addedEffects: [] as string[],
  activePlayer: { id: 0, index: 0 },
  activeSkill: null as ActiveSkill
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
    },
    setActiveSkill: (state: State, action: PayloadAction<ActiveSkill>) => {
      state.activeSkill = action.payload;
    },
    addUsedSkills: (state: State, action: PayloadAction<string>) => {
      state.usedSkills.push(action.payload);
    },
    resetUsedSkills: (state: State) => {
      return {
        ...state,
        usedSkills: [] as string[]
      };
    },
    addAddedEffects: (state: State, action: PayloadAction<string>) => {
      state.addedEffects.push(action.payload);
    },
    resetAddedEffects: (state: State) => {
      return {
        ...state,
        addedEffects: [] as string[]
      };
    }
  }
});

export const {
  setInitiative,
  setRound,
  setActivePlayer,
  setActiveSkill,
  addUsedSkills,
  resetUsedSkills,
  addAddedEffects,
  resetAddedEffects
} = roundSlice.actions;

export const roundReducer = roundSlice.reducer;
