import styled from 'styled-components';
import cursorDefaultImg from '../battlefield/images/cursors/cursor-default.png';
import { LocationName } from '../battlefield/types';
import wallSrc from './images/wall.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #242424;
  color: #fff;

  height: 100vh;
`;

type LocationProps = {
  $location: LocationName;
  $positionX: number;
  $time: number;
  $scrollTime: number;
};

export const Viewport = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  cursor: url(${cursorDefaultImg}), auto;
`
export const Border = styled.div`
  width: 33%;
  border: 1px solid red;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

export const Foreground = styled.img.attrs({
  src: wallSrc,
})`
  width: 100%;
`

export const Location = styled.div<LocationProps>`
  position: absolute;
  top: 0;
  left: ${({ $positionX }) => `${$positionX}px`};
  width: 2940px;
  height: 100%;
  background-size: contain;
  background-position: 0 center;
  background-repeat: repeat;
  transition: ${({ $scrollTime }) => `left ${$scrollTime}ms linear`};
  background-image: url(${({ $location }) =>
    `/images/locations/${$location}.png`});
`;

type HeroProps = {
  $position: {
    x: number;
    y: number;
  };
  $forwardDirection: boolean;
  $time: number;
};
export const Hero = styled.div<HeroProps>`
  position: absolute;
  top: ${({ $position }) => $position.y}px;
  left: ${({ $position }) => $position.x}px;
  transform: ${({ $forwardDirection }) =>
    $forwardDirection ? 'initial' : 'rotate3d(0, 1, 0, 180deg)'};

  transition: ${({ $time }) => `left ${$time}ms linear, top ${$time}ms linear`};
`;

export const Sword = styled.img.attrs({
  src: '/images/weapons/swords/meat-cutter.png',
})`
  position: absolute;
  top: 500px;
  left: 1890px;
  width: 120px;
`

export const DestroyerArmor = styled.img.attrs({
  src: '/images/armors/destroyer/Body.png',
})`
  position: absolute;
  top: 300px;
  left: 1490px;
  width: 100px;
`

export const DestroyerHelmet = styled.img.attrs({
  src: '/images/helmets/600/Destroyer Helmet.png',
})`
  position: absolute;
  top: 350px;
  left: 1390px;
  width: 100px;
`