import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HERO_ID, NPC_ID } from '../constants';

type Position = {
  x: number;
  y: number;
};

type GridPosition = [number, number];

type CharacterPosition = {
  id: number;
  position: Position;
  gridPosition: GridPosition;
  direction: string;
  isRunning: boolean;
};

const initialState: Array<CharacterPosition> = [
  {
    id: HERO_ID,
    position: {
      x: 100,
      y: 300
    },
    gridPosition: [3, 1],
    isRunning: false,
    direction: 'right'
  },
  {
    id: NPC_ID,
    position: {
      x: 400,
      y: 100
    },
    gridPosition: [1, 4],
    isRunning: false,
    direction: 'right'
  }
];

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
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<CharacterPosition>) => {
      return [...state, action.payload];
    },
    setCharacterPosition: (
      state,
      action: PayloadAction<SetCharacterPositionPayload>
    ) => {
      const { position, id } = action.payload;

      const targetCharacter = state.find((character) => character.id == id);

      if (targetCharacter) {
        targetCharacter.position = position;
      }
    },
    setCharacterGridPosition: (
      state,
      action: PayloadAction<SetCharacterGridPositionPayload>
    ) => {
      const { position, id } = action.payload;

      const targetCharacter = state.find((character) => character.id == id);

      if (targetCharacter) {
        targetCharacter.gridPosition = position;
      }
    },
    setCharacterDirection: (
      state,
      action: PayloadAction<SetCharacterDirectionPayload>
    ) => {
      const { direction, id } = action.payload;

      const targetCharacter = state.find((character) => character.id == id);

      if (targetCharacter) {
        targetCharacter.direction = direction;
      }
    },
    setCharacterIsRunning: (
      state,
      action: PayloadAction<SetCharacterisRunningPayload>
    ) => {
      const { isRunning, id } = action.payload;

      const targetCharacter = state.find((character) => character.id == id);

      if (targetCharacter) {
        targetCharacter.isRunning = isRunning;
      }
    },
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
