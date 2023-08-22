import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


type Bounds = {
  width: number;
  height: number;
}

const initialState = {
  viewportBounds: {
    width: 0,
    height: 0,
  },
  locationBounds: {
    width: 0,
    height: 0,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewportBounds: (state, action: PayloadAction<Bounds>) => {
      return {
        ...state,
        viewportBounds: action.payload
      };
    },
    setLocationBounds: (state, action: PayloadAction<Bounds>) => {
      return {
        ...state,
        locationBounds: action.payload
      };
    },
  }
});

export const { setViewportBounds, setLocationBounds  } = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
