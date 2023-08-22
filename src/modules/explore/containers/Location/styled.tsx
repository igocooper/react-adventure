import styled from 'styled-components';
import { LocationName } from 'modules/battlefield/types';

type LocationProps = {
  location: LocationName;
  positionX: number;
  scrollTime: number;
};

export const Container = styled.div<LocationProps>`
  position: absolute;
  top: 0;
  left: ${({ positionX }) => `${positionX}px`};
  width: 2940px;
  height: 100%;
  background-size: contain;
  background-position: 0 center;
  background-repeat: repeat;
  transition: ${({ scrollTime }) => `left ${scrollTime}ms linear`};
  background-image: url(${({ location }) =>
    `/images/locations/${location}.png`});
`;
