import React from 'react';
import { HiglightedTitle, Letter } from './styled';

interface OwnProps {
  title: string;
}

/* eslint-disable @typescript-eslint/restrict-plus-operands */

export const MainTitle = ({ title }: OwnProps) => {
  const letters = title.split('');

  return (
    <HiglightedTitle>
      {letters.map((letter, index) => (
        <Letter key={`${letter + index}`} $i={index + 1}>
          {letter}
        </Letter>
      ))}
    </HiglightedTitle>
  );
};
