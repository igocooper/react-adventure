import styled, { keyframes, css } from 'styled-components';

type AttackImageConrainerProps = {
  $active?: boolean;
  $animationDuration: number;
  $height: number;
  $width: number;
  $src: string;
  $attackId: string;
  $zIndex: number;
  $position: {
    x: number;
    y: number;
  };
  $targetBounds?: DOMRect;
};

const moving = (zIndex: number) => keyframes`
  0% {
    transform: translate(0, 0 ) scale(0.8);
    z-index: ${zIndex + 1};
  }
  
  12% {
    transform: translate(30px, 7px) scale(1);
    z-index: ${zIndex + 1};
  }
  
  25% {
    transform: translate(60px, 15px) scale(1);
    z-index: ${zIndex + 1};
  }

  37% {
    transform: translate(90px, 7px) scale(1);
    z-index: ${zIndex + 1};
  }
  
  50% {
    transform: translate(120px, 0)  scale(0.8);
    z-index: ${zIndex + 1};
  }
  
  62% {
    transform: translate(90px, -7px) scale(0.8);
    z-index: ${zIndex - 1};
  }
  
  75% {
    transform: translate(60px, -15px) scale(0.8);
    z-index: ${zIndex - 1};
  }

  87% {
    transform: translate(30px, -7px) scale(0.8);
    z-index: ${zIndex - 1};
  }
  
  100% {
    transform: translate(0, 0) scale(0.8); 
    z-index: ${zIndex - 1};
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
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
  ${({ $zIndex }) => css`
    animation: ${moving($zIndex)} 1800ms linear infinite;
  `}
  z-index: ${({ $zIndex }) => $zIndex + 1};
  pointer-events: none;
`;

type AttackImageProps = {
  $src: string;
  $active: boolean;
  $isSpinning: boolean;
  $animationDuration: number;
  $height: number;
  $width: number;
  $position: {
    x: number;
    y: number;
  };
  $targetBounds?: DOMRect;
};

export const AttackImage = styled.div<AttackImageProps>`
  position: absolute;
  width: 100%;
  height: 100%;
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

    return `translate(${transformX}px,${transformY}px) scale(3)`;
  }};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    animation: ${spin} 2s linear infinite;

    background-image: ${({ $src }) => `url(${$src})`};
    background-repeat: no-repeat;
    background-size: contain;

    ${({ $isSpinning }) =>
      $isSpinning
        ? css`
            animation: ${spin} 200ms linear infinite;
          `
        : ''}
  }
`;
