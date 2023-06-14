import React from 'react';
import { Link } from 'react-router-dom';
import { path } from 'modules/router/constants';

export const MainScreen = () => (
  <ul>
    <li>
      <Link to={path.BATTLEFIELD}>Battlefield</Link>
    </li>
    <li>
      <Link to={path.SPRITES}>Sprites</Link>
    </li>
  </ul>
);
