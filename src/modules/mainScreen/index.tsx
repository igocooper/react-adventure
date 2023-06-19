import React from 'react';
import { Link } from 'react-router-dom';
import { path } from 'modules/router/constants';
import { CharacterAnimation } from '../animation/containers/CharacterAnimation';

export const MainScreen = () => (
  <ul>
    <li>
      <Link to={path.BATTLEFIELD}>Battlefield</Link>
    </li>
    <li>
      <Link to={path.SPRITES}>Sprites</Link>
    </li>
    <CharacterAnimation />
  </ul>
);
