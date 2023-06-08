import styled from 'styled-components';
import villageRoadImg from './images/locations/village_road.png';

export const Location = styled.div.attrs({
  className: 'location'
})`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;

  background-image: url(${villageRoadImg});
`;

export const Troops = styled.div`
  margin: 50vh 0 0;
  display: inline-block;
  width: 380px;
  min-height: 300px;
  position: relative;
`;

export const Attackers = styled(Troops).attrs({
  className: 'attackers'
})``;

export const Defenders = styled(Troops).attrs({
  className: 'defenders'
})``;

interface TileProps {
  $position: number;
}

export const Tile = styled.div.attrs((props: { $position: number }) => ({
  className: `tile tile-${props.$position}`
}))<TileProps>`
  position: absolute;
  width: 70px;
  height: 70px;

  &.tile-1 {
    top: -10px;
    left: 280px;
    z-index: 1;
  }

  &.tile-2 {
    top: 60px;
    left: 220px;
    z-index: 3;
  }

  &.tile-3 {
    z-index: 5;
    top: 130px;
    left: 150px;
  }

  &.tile-4 {
    left: 140px;
    z-index: 2;
  }

  &.tile-5 {
    top: 70px;
    left: 80px;
    z-index: 4;
  }

  &.tile-6 {
    left: 10px;
    top: 140px;
    z-index: 6;
  }

  ${Defenders} & {
    transform: rotate3d(0, 1, 0, 180deg);

    &.tile-1 {
      left: 140px;
    }

    &.tile-2 {
      top: 70px;
      left: 80px;
    }

    &.tile-3 {
      left: 10px;
      top: 140px;
    }

    &.tile-4 {
      top: -10px;
      left: 280px;
    }

    &.tile-5 {
      top: 60px;
      left: 220px;
    }

    &.tile-6 {
      top: 130px;
      left: 150px;
    }
  }
`;
