import { Object } from './styled';
import React, { PropsWithChildren } from 'react';
import usePrevious from 'common/hooks/usePrevious';
import { calculateMoveAnimationTime } from 'common/helpers';
import { useSelector } from 'store/hooks';
import { heroDirectionSelector, heroPositionSelector } from '../selectors';

export const MovableObject = ({ children }: PropsWithChildren) => {
  const position = useSelector(heroPositionSelector);
  const direction = useSelector(heroDirectionSelector);
  const prevPosition = usePrevious(position) || { x: 0, y: 0 };
  const heroMoveAnimationTime = calculateMoveAnimationTime(
    position,
    prevPosition
  );

  return (
    <Object
      $forwardDirection={direction === 'right'}
      $time={heroMoveAnimationTime}
      $position={position}
    >
      {children}
    </Object>
  );
};
