import { combineReducers } from 'redux';
import { battleFieldReducer } from 'modules/battleField/reducers';
import { dialogsReducer } from 'modules/dialogs/reducers';
import { exploreReducer } from 'modules/explore/reducers';

export const rootReducer = combineReducers({
  battleField: battleFieldReducer,
  explore: exploreReducer,
  dialogs: dialogsReducer
});
