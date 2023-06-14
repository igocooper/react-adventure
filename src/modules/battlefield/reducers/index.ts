import { combineReducers } from 'redux';
import { roundReducer } from './roundSlice';
import { troopsReducer } from './troopsSlice';
import { hoveredElementReducer } from './hoveredElementSlice';
import { cursorReducer } from './cursorSlice';
import { battlefieldDisabledStatusReducer } from './battlefieldDisabledStatusSlice';

export const battleFieldReducer = combineReducers({
  round: roundReducer,
  troops: troopsReducer,
  ui: combineReducers({
    hoveredElement: hoveredElementReducer,
    cursor: cursorReducer,
    battlefieldDisabledStatus: battlefieldDisabledStatusReducer
  })
});
