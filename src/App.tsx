import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Router } from './modules/router';

export const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);
