import { combineReducers } from 'redux';
import { initiativesReducer } from './initiativesSlice';
import { troopsReducer } from './troopsSlice';
import { hoveredElementReducer } from './hoveredElementSlice';
import { cursorReducer } from './cursorSlice';
import { battlefieldDisabledStatusReducer } from './battlefieldDisabledStatusSlice';
import { activePlayerReducer } from './activePlayerSlice';

export const battleFieldReducer = combineReducers({
  activePlayer: activePlayerReducer,
  initiatives: initiativesReducer,
  troops: troopsReducer,
  ui: combineReducers({
    hoveredElement: hoveredElementReducer,
    cursor: cursorReducer,
    battlefieldDisabledStatus: battlefieldDisabledStatusReducer
  })
});
