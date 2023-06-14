import React from 'react';
import * as styled from './styled';
import type { Trooper } from '../../types';

interface OwnProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}
type CharacterProps = Pick<Trooper, 'type'> & OwnProps;

export const Character = ({
  type,
  onMouseEnter,
  onMouseLeave,
  onClick
}: CharacterProps) => {
  return (
    <styled.Character
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      $type={type}
    />
  );
};
