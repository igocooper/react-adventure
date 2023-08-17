import styled from 'styled-components';
import cursorDefaultImg from '../battlefield/images/cursors/cursor-default.png';
import { LocationName } from '../battlefield/types';

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
};

export const Location = styled.div<LocationProps>`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: 0;
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  transition: background-position 200ms linear;
  background-image: url(${({ $location }) =>
    `/images/locations/${$location}.png`});
  cursor: url(${cursorDefaultImg}), auto;
`;

type HeroProps = {
  $position: {
    x: number;
    y: number;
  };
  $speedX?: number;
  $speedY?: number;
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

// transition: ${({ $speedX, $speedY }) =>
// `left ${$speedX}ms linear, top ${$speedY}ms linear`};
