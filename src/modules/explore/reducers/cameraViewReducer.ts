import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  positionX: 0,
};

export const cameraViewSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setCameraViewPosition: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        positionX: action.payload
      };
    }
  }
});

export const { setCameraViewPosition } =
  cameraViewSlice.actions;

export const cameraViewReducer = cameraViewSlice.reducer;
