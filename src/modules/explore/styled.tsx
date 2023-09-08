import styled from 'styled-components';
import cursorDefaultImg from '../battlefield/images/cursors/cursor-default.png';

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #242424;
  color: #fff;
  height: 100vh;
  width: 100vw;
`;

export const NPC = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
  pointer-events: initial;

  & > * {
    pointer-events: none;
  }
`;

export const Viewport = styled.div<{
  maxWidth: number;
}>`
  position: relative;
  width: 100vw;
  height: 100vh;
  cursor: url(${cursorDefaultImg}), auto;
  overflow-x: hidden;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
`;

export const Sword = styled.img.attrs({
  src: '/images/weapons/swords/meat-cutter.png'
})`
  position: absolute;
  top: 200px;
  left: 1000px;
  width: 120px;
`;

export const DestroyerArmor = styled.img.attrs({
  src: '/images/armors/destroyer/Body.png'
})`
  position: absolute;
  top: 300px;
  left: 1500px;
  width: 100px;
`;

export const DestroyerHelmet = styled.img.attrs({
  src: '/images/helmets/600/Destroyer Helmet.png'
})`
  position: absolute;
  top: 400px;
  left: 1600px;
  width: 100px;
`;

export const FrontDecor = styled.img.attrs({
  src: '/images/locations/front-decor/wall.png'
})`
  position: absolute;
  width: 50%;
  height: 100%;
  z-index: 9;
  pointer-events: none;
  bottom: 0;
`;
