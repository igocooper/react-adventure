import React from 'react';
import * as styled from './styled';

interface OwnProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  children: React.ReactNode;
}
type CharacterProps = OwnProps;

export const Character = ({
  children,
  onMouseEnter,
  onMouseLeave,
  onClick
}: CharacterProps) => {
  return (
    <styled.Character
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </styled.Character>
  );
};
