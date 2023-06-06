import React from 'react';
import * as styled from './styled';

interface CharacterProps {
  type: string;
}

export const Character = ({ type }: CharacterProps) => {
  return <styled.Character $type={type} />;
};
