import styled from 'styled-components';
import type { EffectName } from 'modules/battlefield/types';

type EffectImageProps = {
  $active?: boolean;
  $animationDuration: number;
  $height: number;
  $width: number;
  $src: string;
  $attackId: EffectName;
  $position: {
    x: number;
    y: number;
  };
};

export const EffectImage = styled.div.attrs(
  ({ $attackId }: EffectImageProps) => ({
    className: `effectImage ${$attackId}`
  })
)<EffectImageProps>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  position: absolute;
  top: ${({ $position }) => $position.y}px;
  left: ${({ $position }) => $position.x}px;
  transform: translate(-50%, -50%);
  z-index: 99;
  pointer-events: none;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transform: ${({ $active }) => ($active ? 'scale(1.5)' : 'initial')};
    transition: ${({ $animationDuration, $active }) =>
      $active ? `all ${$animationDuration / 1000}s ease-out` : 'initial'};

    background-image: ${({ $src }) => `url(${$src})`};
    background-size: contain;
  }
`;
