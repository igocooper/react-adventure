import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';
import { heroReducer } from './heroReducer';
import { cameraViewReducer } from './cameraViewReducer';

export const exploreReducer = combineReducers({
  ui: uiReducer,
  hero: heroReducer,
  cameraView: cameraViewReducer,

});




