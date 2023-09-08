import React, { PropsWithChildren } from 'react';
import { Container } from './styled';
import { MOVEMENT_ANIMATION_SPEED } from 'common/helpers/calculateMoveAnimationTime';
import { CAMERA_SCROLL_STEP } from '../../constants';
import { useLocation } from 'common/hooks/useLocation';

type LocationProps = {
  positionX: number;
  bgSize: string;
  width: number;
};
export const  Location = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<LocationProps>
>((props, ref) => {
  const heroMoveAnimationTime = CAMERA_SCROLL_STEP / MOVEMENT_ANIMATION_SPEED;
  const location = useLocation();

  return (
    <Container
      ref={ref}
      location={location}
      scrollTime={heroMoveAnimationTime}
      {...props}
    />
  );
});
