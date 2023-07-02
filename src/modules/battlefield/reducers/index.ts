import { combineReducers } from 'redux';
import { roundReducer } from './roundSlice';
import { troopsReducer } from './troopsSlice';
import { hoveredElementReducer } from './hoveredElementSlice';
import { cursorReducer } from './cursorSlice';
import { battlefieldDisabledStatusReducer } from './battlefieldDisabledStatusSlice';
import { battlefieldLoadedStatusReducer } from './battlefieldLoadedStatusSlice';
import { damageEventsReducer } from './damageEventsSlice';

export const battleFieldReducer = combineReducers({
  round: roundReducer,
  troops: troopsReducer,
  ui: combineReducers({
    hoveredElement: hoveredElementReducer,
    cursor: cursorReducer,
    battlefieldDisabledStatus: battlefieldDisabledStatusReducer,
    battlefieldLoadedStatus: battlefieldLoadedStatusReducer,
    damageEvents: damageEventsReducer
  })
});
