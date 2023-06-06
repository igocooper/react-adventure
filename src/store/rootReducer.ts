import { combineReducers } from 'redux';
import { counterReducer } from 'modules/mainScreen/containers/counter/CounterSlice';
import { battleFieldReducer } from 'modules/battleField/reducers';

export const rootReducer = combineReducers({
  counter: counterReducer,
  battleField: battleFieldReducer
});
