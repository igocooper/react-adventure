import { combineReducers } from 'redux';
import { battleFieldReducer } from 'modules/battleField/reducers';

export const rootReducer = combineReducers({
  battleField: battleFieldReducer
});
