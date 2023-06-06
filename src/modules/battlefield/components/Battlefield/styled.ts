import styled, { css } from 'styled-components';
import villageRoadImg from './images/locations/village_road.png';

interface TileProps {
  $position: number;
}

export const Tile = styled.div<TileProps>`
  position: absolute;
  width: 70px;
  height: 70px;

  ${(props) => {
    switch (props.$position) {
      case 1:
        return css`
          top: -10px;
          left: 280px;
          z-index: 1;
        `;
      case 2:
        return css`
          top: 60px;
          left: 220px;
          z-index: 3;
        `;
      case 3:
        return css`
          z-index: 5;
          top: 130px;
          left: 150px;
        `;
      case 4:
        return css`
          left: 140px;
          z-index: 2;
        `;
      case 5:
        return css`
          top: 70px;
          left: 80px;
          z-index: 4;
        `;
      case 6:
        return css`
          left: 10px;
          top: 140px;
          z-index: 6;
        `;
      default:
        return css``;
    }
  }}
`;

export const Location = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;

  background-image: url(${villageRoadImg});
`;

export const Attackers = styled.div`
  margin: 50vh 0 0;
  display: inline-block;
  width: 380px;
  min-height: 300px;
  position: relative;
`;

export const Defenders = styled(Attackers)`
  transform: rotate3d(0, 1, 0, 180deg);
`;
