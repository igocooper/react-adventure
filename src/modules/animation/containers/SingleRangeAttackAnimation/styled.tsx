import styled from 'styled-components';

interface RangeAttackImageProps {
  $active?: boolean;
  $animationDuration: number;
  $height: number;
  $width: number;
  $src: string;
}

export const RangeAttackImage = styled.div<RangeAttackImageProps>`
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  position: absolute;
  transition: ${({ $animationDuration }) =>
    `transform ${$animationDuration / 1000}s ease-out`};

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
  }

  .defenders &::before {
    transform: rotate3d(0, 1, 0, 180deg);
  }
`;
