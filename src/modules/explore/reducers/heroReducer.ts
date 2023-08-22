import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Position = {
  x: number;
  y: number;
};


const initialState = {
  position: {
    x: 0,
    y: 400
  },
  isRunning: false,
  direction: 'right',
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
    },
  }
});

export const { setHeroPosition, setHeroDirection, setHeroIsRunning,  } = heroSlice.actions;

export const heroReducer = heroSlice.reducer;
