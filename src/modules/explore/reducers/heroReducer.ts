import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Position = {
  x: number;
  y: number;
};

type GridPosition = [number, number];

const initialState : {
  position: Position;
  gridPosition: GridPosition;
  direction: string;
  isRunning: boolean;
} = {
  position: {
    x: 100,
    y: 300
  },
  gridPosition: [3, 1],
  isRunning: false,
  direction: 'right'
};

export const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setHeroPosition: (state, action: PayloadAction<Position>) => {
      return {
        ...state,
        position: action.payload
      };
    },
    setHeroGridPosition: (state, action: PayloadAction<GridPosition>) => {
      return {
        ...state,
        gridPosition: action.payload
      };
    },
    setHeroDirection: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        direction: action.payload
      };
    },
    setHeroIsRunning: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isRunning: action.payload
      };
    }
  }
});

export const {
  setHeroPosition,
  setHeroDirection,
  setHeroIsRunning,
  setHeroGridPosition
} = heroSlice.actions;

export const heroReducer = heroSlice.reducer;
