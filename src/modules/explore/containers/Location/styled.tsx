import styled from 'styled-components';
import type { Position } from 'common/types';

type LocationProps = {
  src: string;
  positionX: number;
  scrollTime: number;
  bgSize: string;
  width: number;
};

export const LocationBackground = styled.div<LocationProps>`
  position: absolute;
  top: 0;
  left: ${({ positionX }) => `${positionX}px`};
  width: ${({ width }) => `${width}px`};
  height: 100%;
  background-size: ${({ bgSize }) => bgSize};
  background-position: 0 0;
  background-repeat: no-repeat;
  transition: ${({ scrollTime }) => `left ${scrollTime}ms linear`};
  background-image: url(${({ src }) => src});
`;

export const FrontDecor = styled.img.attrs(({ src }: { src: string }) => ({
  src
}))<{
  width: number;
  src: string;
}>`
  position: absolute;
  pointer-events: none;
  width: auto;
  height: auto;
  top: 0;
  left: 0;
  z-index: 11;
`;

type StaticObjectProps = {
  position: Position;
  src: string;
  zIndex: number;
};
export const StaticObject = styled.img.attrs(({ src }: StaticObjectProps) => ({
  src,
  className: 'object'
}))<StaticObjectProps>`
  pointer-events: none;
  position: absolute;
  top: ${({ position }) => `${position.y}px`};
  left: ${({ position }) => `${position.x}px`};
  z-index: ${({ zIndex }) => zIndex};
`;
