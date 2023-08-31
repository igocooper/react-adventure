import styled, { keyframes, css } from 'styled-components';
import type { Position } from 'common/types';

const zIndex = keyframes`
  0% {
    z-index: 99;
  }
  
  80% {
    z-index: 99;
  }
  
  100% {
    z-index: -1;
  }
`;

const dropLeftWeapon = keyframes`
  0% {
    transform: rotate(-90deg);
    bottom: 0;
    left: 0;
  }
  
  30% {
    bottom: 60px;
    left: -20px;
  }
  
  100% {
    transform: rotate(-536deg);
    bottom: -20px;
    left: -60px;
  }
`;

const dropRightWeapon = keyframes`
  0% {
    opacity: 1;
    transform: rotate(90deg);
    bottom: 0;
    right: 0;
  }
  
  30% {
    bottom: 60px;
    right: -20px;
  }
  
  100% {
    opacity: 1;
    transform: rotate(536deg);
    bottom: -20px;
    right: -60px;
  }
`;

type EffectProps = {
  active: boolean;
  animationSpeed: number;
  position: Position;
};

export const DissarmEffect = styled.div.attrs({
  className: 'dissarm'
})<EffectProps>`
  width: 100px;
  height: 100px;
  position: absolute;
  top: ${({ position }) => position.y}px;
  left: ${({ position }) => position.x}px;
  transform: translate(-50%, -50%);
  z-index: -1;
  pointer-events: none;

  ${({ active, animationSpeed }) =>
    active
      ? css`
          animation: ${zIndex} ${animationSpeed}ms ease-in;
          animation-fill-mode: forwards;
        `
      : css``};
`;

type WeaponProps = {
  active: boolean;
  animationSpeed: number;
  delay?: number;
};
export const Weapon = styled.img<WeaponProps>`
  position: absolute;
  width: 110px;
  height: auto;

  transform-origin: center;
`;

export const LeftWeapon = styled(Weapon)`
  ${({ animationSpeed, delay }) => css`
    animation: ${dropLeftWeapon} ${animationSpeed}ms ${delay || 0}ms ease-in;
    animation-fill-mode: forwards;
  `};
`;

export const Bow = styled(Weapon)`
  ${({ animationSpeed, delay }) => css`
    animation: ${dropLeftWeapon} ${animationSpeed}ms ${delay || 0}ms ease-in;
    animation-fill-mode: forwards;
  `};
`;

export const RightWeapon = styled(Weapon)`
  opacity: 0;

  ${({ animationSpeed, delay }) => css`
    animation: ${dropRightWeapon} ${animationSpeed}ms ${delay || 0}ms ease-in;
    animation-fill-mode: forwards;
  `};
`;
