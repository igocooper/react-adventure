import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const store = createStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
