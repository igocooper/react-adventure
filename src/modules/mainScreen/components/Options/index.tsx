import React from 'react';
import { OptionsList } from './styled';
import { Link } from 'react-router-dom';
import { path } from '../../../router';

export const Options = () => {
  return (
    <OptionsList>
      <li>
        <Link to={path.BATTLEFIELD}>Battlefield</Link>
      </li>
      <li>
        <Link to={path.WARDROBE}>Wardrobe</Link>
      </li>
      <li>
        <Link to={path.SPRITES}>Sprites</Link>
      </li>
    </OptionsList>
  );
};
