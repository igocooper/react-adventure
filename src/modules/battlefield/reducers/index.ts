import { combineReducers } from 'redux';
import { initiativesReducer } from './initiativesSlice';
import { troopsReducer } from './troopsSlice';

export const battleFieldReducer = combineReducers({
  initiatives: initiativesReducer,
  troops: troopsReducer
});
