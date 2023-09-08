import React, { PropsWithChildren, useRef } from 'react';
import { LocationBackground } from './styled';
import { MOVEMENT_ANIMATION_SPEED } from 'common/helpers/calculateMoveAnimationTime';
import { CAMERA_SCROLL_STEP } from '../../constants';
import { Background, Viewport } from '../../styled';
import { useSelector } from 'store/hooks';
import {
  cameraViewPositionXSelector,
  locationMetaSelector,
  locationSelector
} from '../../selectors';
import { useInitLocation } from './hooks/useInitLocation';

export const Location = (props: PropsWithChildren) => {
  const { children } = props;
  const viewportRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const cameraViewPositionX = useSelector(cameraViewPositionXSelector);
  const heroMoveAnimationTime = CAMERA_SCROLL_STEP / MOVEMENT_ANIMATION_SPEED;

  useInitLocation({
    viewportRef,
    locationRef
  });

  const locationMeta = useSelector(locationMetaSelector);
  const { backgroundSrc } = useSelector(locationSelector);
  const { bgWidth, bgSize } = locationMeta;

  return (
    <Background>
      <Viewport ref={viewportRef} maxWidth={bgWidth}>
        <LocationBackground
          src={backgroundSrc!}
          scrollTime={heroMoveAnimationTime}
          ref={locationRef}
          positionX={cameraViewPositionX}
          bgSize={bgSize}
          width={bgWidth}
        >
          {children}
        </LocationBackground>
      </Viewport>
    </Background>
  );
};
