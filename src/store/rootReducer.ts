import { combineReducers } from 'redux';
import { battleFieldReducer } from 'modules/battleField/reducers';
import { dialogsReducer } from 'modules/dialogs/reducers';

export const rootReducer = combineReducers({
  battleField: battleFieldReducer,
  dialogs: dialogsReducer
});
