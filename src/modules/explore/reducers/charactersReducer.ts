import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HERO_ID, NPC_ID } from '../constants';

type Position = {
  x: number;
  y: number;
};

type GridPosition = number[];

type CharacterPosition = {
  id: number;
  position: Position;
  gridPosition: GridPosition;
  direction: string;
  isRunning: boolean;
};

const initialState: Record<number, CharacterPosition> = {
  [HERO_ID]: {
    id: HERO_ID,
    position: {
      x: 100,
      y: 300
    },
    gridPosition: [3, 1],
    isRunning: false,
    direction: 'right'
  },
  [NPC_ID]: {
    id: NPC_ID,
    position: {
      x: 400,
      y: 100
    },
    gridPosition: [1, 4],
    isRunning: false,
    direction: 'right'
  },
  [3]: {
    id: 3,
    position: {
      x: 0,
      y: 400
    },
    gridPosition: [4, 0],
    isRunning: false,
    direction: 'right'
  },
  [4]: {
    id: 4,
    position: {
      x: 200,
      y: 500
    },
    gridPosition: [5, 2],
    isRunning: false,
    direction: 'right'
  },
  [5]: {
    id: 5,
    position: {
      x: 300,
      y: 500
    },
    gridPosition: [5, 3],
    isRunning: false,
    direction: 'right'
  },
  [6]: {
    id: 6,
    position: {
      x: 200,
      y: 0
    },
    gridPosition: [0, 2],
    isRunning: false,
    direction: 'right'
  },


};

type SetCharacterPositionPayload = {
  id: number;
  position: Position;
};

type SetCharacterGridPositionPayload = {
  id: number;
  position: GridPosition;
};

type SetCharacterDirectionPayload = {
  id: number;
  direction: string;
};

type SetCharacterisRunningPayload = {
  id: number;
  isRunning: boolean;
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<CharacterPosition>) => {
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    },
    setCharacterPosition: (
      state,
      action: PayloadAction<SetCharacterPositionPayload>
    ) => {
      const { position, id } = action.payload;

      const targetCharacter = state[id];

      if (targetCharacter) {
        targetCharacter.position = position;
      }
    },
    setCharacterGridPosition: (
      state,
      action: PayloadAction<SetCharacterGridPositionPayload>
    ) => {
      const { position, id } = action.payload;

      const targetCharacter = state[id];

      if (targetCharacter) {
        targetCharacter.gridPosition = position;
      }
    },
    setCharacterDirection: (
      state,
      action: PayloadAction<SetCharacterDirectionPayload>
    ) => {
      const { direction, id } = action.payload;

      const targetCharacter = state[id];

      if (targetCharacter) {
        targetCharacter.direction = direction;
      }
    },
    setCharacterIsRunning: (
      state,
      action: PayloadAction<SetCharacterisRunningPayload>
    ) => {
      const { isRunning, id } = action.payload;

      const targetCharacter = state[id];

      if (targetCharacter) {
        targetCharacter.isRunning = isRunning;
      }
    }
  }
});

export const {
  addCharacter,
  setCharacterPosition,
  setCharacterGridPosition,
  setCharacterDirection,
  setCharacterIsRunning
} = charactersSlice.actions;

export const charactersReducer = charactersSlice.reducer;
