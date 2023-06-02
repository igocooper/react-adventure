import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const index = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;
