import styled from 'styled-components';

type MagicEffectProps = {
  $active: boolean;
  $height: number;
  $width: number;
  $src: string;
  $position: {
    x: number | string;
    y: number | string;
  };
  $bgPosition: {
    x: number;
    y: number;
  };
};

export const MagicEffect = styled.div<MagicEffectProps>`
  position: absolute;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  top: ${({ $position }) => `${$position.y}px`};
  left: ${({ $position }) => `${$position.x}px`};
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background-position: ${({ $bgPosition }) =>
    `${$bgPosition.x}${typeof $bgPosition.x === 'number' ? 'px' : ''} ${
      $bgPosition.y
    }${typeof $bgPosition.x === 'number' ? 'px' : ''}`};
  background-image: url('${({ $src }) => $src}');
  z-index: 99;
`;
