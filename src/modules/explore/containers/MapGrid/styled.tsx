import styled from 'styled-components';
import { Position } from 'common/types';
import barrelImg from './images/barrel.png';

export const Container = styled.div<{
  scale: number;
}>`
  position: absolute;
  transform: ${({ scale }) => `scale3d(${scale}, ${scale}, 1)`};
  transform-origin: 0 0;
  top: 0;
  left: 0;
`;

type CellProps = {
  position: Position;
  visible?: boolean;
  width: number;
  height: number;
};
export const Cell = styled.div<CellProps>`
  position: absolute;
  left: ${({ position }) => `${position.x}px`};
  top: ${({ position }) => `${position.y}px`};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: ${({ visible }) => (visible ? '1px dashed red' : 'none')};

  &.barrel {
    background: url(${barrelImg});
    background-size: 90%;
    background-position: center;
  }
`;
