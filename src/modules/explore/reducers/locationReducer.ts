import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Location = {
  frontDecorSrc: Nullable<string>;
  backgroundSrc: Nullable<string>;
  objects: Array<any>;
  meta: LocationMeta;
};

type LocationMeta = {
  scale: number;
  bgSize: string;
  bgWidth: number;
  originalBgWidth: number;
  originalBgHeight: number;
};

const initialState: {
  location: Location;
  isLoading: boolean;
  initialized: boolean;
} = {
  isLoading: false,
  initialized: false,
  location: {
    frontDecorSrc: null,
    backgroundSrc: null,
    objects: [],
    meta: {
      scale: 1,
      bgSize: '100%',
      bgWidth: 0,
      originalBgWidth: 0,
      originalBgHeight: 0,
    }
  }
};

type SetLocationPayload = Location;

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload
      };
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        initialized: action.payload
      };
    },
    setLocation: (state, action: PayloadAction<SetLocationPayload>) => {
      return {
        ...state,
        location: action.payload
      };
    },
    updateLocation: (
      state,
      action: PayloadAction<Partial<SetLocationPayload>>
    ) => {
      return {
        ...state,
        location: {
          ...state.location,
          ...action.payload
        }
      };
    },
    updateLocationMeta: (
      state,
      action: PayloadAction<Partial<SetLocationPayload['meta']>>
    ) => {
      return {
        ...state,
        location: {
          ...state.location,
          meta: {
            ...state.location.meta,
            ...action.payload
          }
        }
      };
    }
  }
});

export const {
  setLocation,
  updateLocation,
  updateLocationMeta,
  setIsLoading,
  setInitialized
} = locationSlice.actions;

export const locationReducer = locationSlice.reducer;
