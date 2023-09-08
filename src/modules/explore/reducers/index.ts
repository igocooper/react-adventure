import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';
import { charactersReducer } from './charactersReducer';
import { cameraViewReducer } from './cameraViewReducer';
import { gridReducer } from './gridReducer';
import { locationReducer } from './locationReducer';

export const exploreReducer = combineReducers({
  ui: uiReducer,
  grid: gridReducer,
  characters: charactersReducer,
  cameraView: cameraViewReducer,
  location: locationReducer
});
