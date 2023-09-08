import styled from 'styled-components';
import { LocationName } from 'modules/battlefield/types';

type LocationProps = {
  location: LocationName;
  positionX: number;
  scrollTime: number;
  bgSize: string;
  width: number;
};

export const Container = styled.div<LocationProps>`
  position: absolute;
  top: 0;
  left: ${({ positionX }) => `${positionX}px`};
  width: ${({ width }) => `${width}px`};
  height: 100%;
  background-size: ${({ bgSize }) => bgSize};
  background-position: 0 0;
  background-repeat: no-repeat;
  transition: ${({ scrollTime }) => `left ${scrollTime}ms linear`};
  background-image: url(${({ location }) =>
          `/images/locations/${location}.png`});
`;