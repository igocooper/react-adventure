import styled, { keyframes, css } from 'styled-components';
import type { Position } from 'common/types';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }
  
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
  
  100% {
    opacity: 0;
    transform: scale(1);
  }
`;

type DivineHealEffectProps = {
  position: Position;
  active: boolean;
  width: number;
  height: number;
};
export const DivineHealEffect = styled.div<DivineHealEffectProps>`
  pointer-events: none;
  position: absolute;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  top: ${({ position }) => `${position.y}px`};
  left: ${({ position }) => `${position.x}px`};
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

type DivineParticleProps = {
  position: Position;
  width: number;
  height: number;
  animationDelay: number;
  animationSpeed: number;
  active: boolean;
};
export const HealParticle = styled.img.attrs({
  src: resolveAssetUrl('/images/effects/holy.png')
})<DivineParticleProps>`
  position: absolute;
  opacity: 0;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  top: ${({ position }) => `${position.y}px`};
  left: ${({ position }) => `${position.x}px`};

  ${({ active, animationSpeed, animationDelay }) =>
    active
      ? css`
          animation: ${fadeIn} ${animationSpeed}ms ease-in ${animationDelay}ms 1;
          animation-fill-mode: forwards;
        `
      : css``};
`;
