import { Title } from './styled';
import { Counter } from './containers/counter/Counter';
import React from 'react';
import { Link } from 'react-router-dom';
import { path } from 'modules/router/constants';

export const MainScreen = () => (
  <>
    <Title>React Adventure</Title>
    <ul>
      <li>
        <Link to={path.BATTLEFIELD}>Battlefield</Link>
      </li>
      <li>
        <Link to={path.SPRITES}>Sprites</Link>
      </li>
    </ul>
    <Counter />
  </>
);
