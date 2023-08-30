import styled from 'styled-components';
import { Position } from 'common/types';
import barrelImg from './images/barrel.png';

export const Grid = styled.div`
  position: absolute;
  width: 100%;
  height: 600px;
  top: 200px;
  left: 0;
  //border: 1px dashed red;
`;

type CellProps = {
  position: Position;
  width: number;
  height: number;
};
export const Cell = styled.div<CellProps>`
  position: absolute;
  left: ${({ position }) => `${position.x}px`};
  top: ${({ position }) => `${position.y}px`};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 1px dashed red;
  
  &.barrel {
    background: url(${barrelImg});
    background-size: 90%;
    background-position: center;
  } 
`;
