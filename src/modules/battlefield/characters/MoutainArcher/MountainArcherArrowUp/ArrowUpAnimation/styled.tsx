import styled, { keyframes } from 'styled-components';

type RangeAttackImageProps = {
  $active?: boolean;
  $animationDuration: number;
  $height: number;
  $width: number;
  $src: string;
  $position: {
    x: number;
    y: number;
  };
  $targetBounds?: DOMRect;
  $path?: string;
};

const moveTroughPath = keyframes`
  100% {
    offset-distance: 100%;
  }
`;

export const RangeAttackImage = styled.div.attrs(
  ({ $active }: RangeAttackImageProps) => ({
    className: `arrow-up ${$active ? 'active' : ''}`
  })
)<RangeAttackImageProps>`
  opacity: ${({ $active }) => ($active ? 1 : 1)};
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  position: absolute;
  top: ${({ $position }) => $position.y}px;
  left: ${({ $position }) => $position.x}px;
  pointer-events: none;

  z-index: 99;

  &.active {
    offset-path: ${({ $path }) => `path('${$path!}')`};
    animation-name: ${moveTroughPath};
    animation-duration: ${({ $animationDuration }) =>
      `${$animationDuration / 1000}s`};
    animation-iteration-count: 1;
    animation-timing-function: linear;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;

    background-image: ${({ $src }) => `url(${$src})`};
    background-repeat: no-repeat;
  }

  .defenders &::before {
    transform: rotate3d(0, 1, 0, 180deg);
  }
`;
