import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './theme/defaultTheme';
import { store } from './store';
import { GlobalStyle } from './GlobalStyle';
import { Router } from './modules/router';

export const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <Provider store={store}>
      <GlobalStyle />
      <Router />
    </Provider>
  </ThemeProvider>
);
