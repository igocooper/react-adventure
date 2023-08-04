import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SkillName } from 'common/types';

type PlayerInfo = {
  id: number;
};

export type ActiveSkill = Nullable<{
  name: SkillName;
}>;

type State = {
  round: number;
  initiative: PlayerInfo[];
  activePlayer: PlayerInfo;
  activeSkill: ActiveSkill;
};

const initialState = {
  round: 0,
  initiative: [] as PlayerInfo[],
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
    }
  }
});

export const { setInitiative, setRound, setActivePlayer, setActiveSkill } =
  roundSlice.actions;

export const roundReducer = roundSlice.reducer;
