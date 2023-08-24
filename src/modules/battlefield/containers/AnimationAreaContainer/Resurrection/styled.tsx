import styled, { keyframes, css } from 'styled-components';
import type { Position } from 'common/types';

const dropLight = keyframes`
  0% {
    opacity: 1;
    transform: scaleX(0.05) translateY(-100%);
  }

  20% {
    opacity: 1;
    transform: scaleX(0.05) translateY(-100%);
  }
  
  40% {
    opacity: 0.1;
    transform: scaleX(1) translateY(-100%);
  }

  90% {
    opacity: 0.1;
    transform: scaleX(1) translateY(-100%);
  }
  
  100% {
    opacity: 0;
    transform: scaleX(1) translateY(-100%);
  }
`;

type DivineParticleProps = {
  position: Position;
  width: number;
  height: number;
  animationDelay: number;
  animationSpeed: number;
  active: boolean;
};
export const Ray = styled.div<DivineParticleProps>`
  pointer-events: none;
  opacity: 0;
  z-index: 1;
  position: absolute;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  top: ${({ position }) => `${position.y}px`};
  left: ${({ position }) => `${position.x}px`};
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background: linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 80% 80% 0 0;

  ${({ active, animationSpeed, animationDelay }) =>
    active
      ? css`
          animation: ${dropLight} ${animationSpeed}ms ease-in
            ${animationDelay}ms 1;
          animation-fill-mode: forwards;
        `
      : css``};
`;
