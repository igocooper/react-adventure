import React from 'react';
import { Title } from './styled';
import { Provider } from 'react-redux';
import { index } from './store';
import { Counter } from './modules/counter/Counter';

export const App = () => (
  <Provider store={index}>
    <Title>React Adventure</Title>
    <Counter />
  </Provider>
);
