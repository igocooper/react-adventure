import styled, { keyframes, css } from 'styled-components';

type AttackImageConrainerProps = {
  $active?: boolean;
  $animationDuration: number;
  $height: number;
  $width: number;
  $src: string;
  $attackId: string;
  $position: {
    x: number;
    y: number;
  };
  $targetBounds?: DOMRect;
};

const moving = keyframes`
  0% {
    transform: translate(0);
  }
  25% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const rotateAndPulse = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(90deg) scale(0.8);
  }
  50% {
    transform: rotate(180deg) scale(1);
  }
  75% {
    transform: rotate(270deg) scale(0.8);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

export const AttackImageContainer = styled.div.attrs(
  ({ $attackId }: AttackImageConrainerProps) => ({
    className: `${$attackId}`
  })
)<AttackImageConrainerProps>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  position: absolute;
  top: ${({ $position }) => $position.y}px;
  left: ${({ $position }) => $position.x}px;
  z-index: 99;
  pointer-events: none;
  transition: ${({ $animationDuration }) =>
    `transform ${$animationDuration / 1000}s ease-in`};
  transform: ${({ $targetBounds, $width, $height, $position, $active }) => {
    if (!$targetBounds || !$active) return 'initial';

    const targetLeftCenter =
      $targetBounds.left + $targetBounds.width / 2 - $width / 2;
    const targetTopCenter =
      $targetBounds.top + $targetBounds.height / 2 - $height / 2;

    const { x, y } = $position;

    const transformX = targetLeftCenter - x;
    const transformY = targetTopCenter - y;

    return `translate(${transformX}px,${transformY}px) scale(2)`;
  }};
`;

type AttackImageProps = {
  $src: string;
  $active: boolean;
};

export const AttackImage = styled.div<AttackImageProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${moving} 800ms linear infinite;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    animation: ${rotateAndPulse} 2s linear infinite;

    background-image: ${({ $src }) => `url(${$src})`};
    background-repeat: no-repeat;
    background-size: contain;

    ${({ $active }) =>
      $active
        ? css`
            animation: ${rotateAndPulse} 200ms linear infinite;
          `
        : ''}
  }
`;
