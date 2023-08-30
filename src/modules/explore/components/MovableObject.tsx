import { Object } from './styled';
import React, { PropsWithChildren } from 'react';
import usePrevious from 'common/hooks/usePrevious';
import { calculateMoveAnimationTime } from 'common/helpers';
import { useSelector } from 'store/hooks';
import {
  makeCharacterDirectionSelector,
  makeCharacterPositionSelector,
} from '../selectors';

export const MovableObject = ({ children, id }: PropsWithChildren<{ id: number}>) => {
  const position = useSelector(makeCharacterPositionSelector(id));
  const direction = useSelector(makeCharacterDirectionSelector(id));
  const prevPosition = usePrevious(position) || { x: 0, y: 0 };
  const heroMoveAnimationTime = calculateMoveAnimationTime(
    position,
    prevPosition
  );

  return (
    <Object
      forwardDirection={direction === 'right'}
      time={heroMoveAnimationTime}
      position={position}
      zIndex={position.y / 100}
    >
      {children}
    </Object>
  );
};
