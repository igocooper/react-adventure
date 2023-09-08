import styled from 'styled-components';

type LocationProps = {
  src: string;
  positionX: number;
  scrollTime: number;
  bgSize: string;
  width: number;
};

export const LocationBackground = styled.div<LocationProps>`
  position: absolute;
  top: 0;
  left: ${({ positionX }) => `${positionX}px`};
  width: ${({ width }) => `${width}px`};
  height: 100%;
  background-size: ${({ bgSize }) => bgSize};
  background-position: 0 0;
  background-repeat: no-repeat;
  transition: ${({ scrollTime }) => `left ${scrollTime}ms linear`};
  background-image: url(${({ src }) => src});
`;
