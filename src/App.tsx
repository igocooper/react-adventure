import React from 'react';
import { Provider } from 'react-redux';
import { index } from './store';
import { Router } from './modules/router';

export const App = () => (
  <Provider store={index}>
    <Router />
  </Provider>
);
