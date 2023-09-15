import React, { PropsWithChildren, useRef } from 'react';
import { FrontDecor, LocationBackground, StaticObject } from './styled';
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
import { MapGrid } from 'modules/explore/containers/MapGrid';
import { getStaticObjectZIndex } from '../../helpers/getStaticObjectZIndex';

type LocationProps = {
  onGridTileClick: (e: MouseEvent, destination: number[]) => void;
};
export const Location = (props: PropsWithChildren<LocationProps>) => {
  const { children, onGridTileClick } = props;
  const viewportRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const cameraViewPositionX = useSelector(cameraViewPositionXSelector);
  const heroMoveAnimationTime = CAMERA_SCROLL_STEP / MOVEMENT_ANIMATION_SPEED;

  useInitLocation({
    viewportRef,
    locationRef
  });

  const locationMeta = useSelector(locationMetaSelector);
  const { backgroundSrc, frontDecorSrc, objects } =
    useSelector(locationSelector);
  const { bgWidth, bgSize, scale } = locationMeta;

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
          <MapGrid onTileClick={onGridTileClick} scale={scale}>
            {objects &&
              objects.map((object) => {
                const { src, gridPositions, position, id } = object;
                const zIndex = getStaticObjectZIndex(gridPositions);
                return (
                  <StaticObject
                    key={id}
                    src={src}
                    zIndex={zIndex}
                    position={position}
                  />
                );
              })}
            {children}
            {frontDecorSrc && (
              <FrontDecor width={bgWidth} src={frontDecorSrc} />
            )}
          </MapGrid>
        </LocationBackground>
      </Viewport>
    </Background>
  );
};
