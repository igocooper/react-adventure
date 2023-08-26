import styled from 'styled-components';
import cursorDefaultImg from '../battlefield/images/cursors/cursor-default.png';
import { Position } from 'common/types';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #242424;
  color: #fff;

  height: 100vh;
`;

export const Viewport = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  cursor: url(${cursorDefaultImg}), auto;
`;

export const Sword = styled.img.attrs({
  src: '/images/weapons/swords/meat-cutter.png'
})`
  position: absolute;
  top: 500px;
  left: 1890px;
  width: 120px;
`;

export const DestroyerArmor = styled.img.attrs({
  src: '/images/armors/destroyer/Body.png'
})`
  position: absolute;
  top: 300px;
  left: 1490px;
  width: 100px;
`;

export const DestroyerHelmet = styled.img.attrs({
  src: '/images/helmets/Destroyer Helmet.png'
})`
  position: absolute;
  top: 350px;
  left: 1390px;
  width: 100px;
`;

export const Grid = styled.div`
  position: absolute;
  width: 100%;
  height: 600px;
  top: 200px;
  left: 0;
  border: 1px dashed red;
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
`;
