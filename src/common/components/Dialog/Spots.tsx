import { Spot, SpotsWrapper } from './styled';
import React, { useState } from 'react';
import { getRandomNumberInRange } from '../../helpers';

interface Props {
  numberOfSpots?: number;
  color: string;
  maxSize?: number;
  minSize?: number;
}

const DEFAULT_NUMBER_OF_SPOTS = 15;

export const Spots = ({ numberOfSpots, color, maxSize, minSize }: Props) => {
  const [spots] = useState(() => {
    return Array.from(
      Array(numberOfSpots || DEFAULT_NUMBER_OF_SPOTS).keys()
    ).map(() => ({
      x: getRandomNumberInRange(1, 100),
      y: getRandomNumberInRange(1, 100),
      size: getRandomNumberInRange(minSize || 15, maxSize || 40)
    }));
  });

  return (
    <SpotsWrapper>
      {spots.map(({ x, y, size }, index) => (
        <Spot
          $x={x}
          $y={y}
          $size={size}
          key={`${index}-${x}-${y}-${size}`}
          $color={color}
        />
      ))}
    </SpotsWrapper>
  );
};
