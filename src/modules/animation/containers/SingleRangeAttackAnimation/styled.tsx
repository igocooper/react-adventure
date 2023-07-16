import styled from 'styled-components';

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
};

export const RangeAttackImage = styled.div<RangeAttackImageProps>`
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  position: absolute;
  top: ${({ $position }) => $position.y}px;
  left: ${({ $position }) => $position.x}px;
  pointer-events: none;
  transition: ${({ $animationDuration }) =>
    `transform ${$animationDuration / 1000}s ease-out`};

  z-index: 99;
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
