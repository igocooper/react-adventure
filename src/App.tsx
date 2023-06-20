import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { GlobalStyle } from './GlobalStyle';
import { Router } from './modules/router';

export const App = () => (
  <Provider store={store}>
    <GlobalStyle />
    <Router />
  </Provider>
);
