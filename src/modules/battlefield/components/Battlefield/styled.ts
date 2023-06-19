import styled from 'styled-components';
import type { Team } from '../../types';
import villageRoadImg from './images/locations/village_road.png';
import cursorDefaultImg from './images/cursors/cursor-default.png';
import cursorWandImg from './images/cursors/cursor-wand.png';
import cursorBowImg from './images/cursors/cursor-bow.png';
import cursorSwordImg from './images/cursors/cursor-sword.png';

interface LocationProps {
  $cursor: string;
}
interface TileProps {
  $position: number;
}

export const Location = styled.div.attrs((props: { $cursor: string }) => ({
  className: `location cursor-${props.$cursor}`
}))<LocationProps>`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  background-image: url(${villageRoadImg});

  &.cursor-sword {
    cursor: url(${cursorSwordImg}), auto;
  }

  &.cursor-default {
    cursor: url(${cursorDefaultImg}), auto;
  }

  &.cursor-disabled {
    cursor: not-allowed;
  }

  &.cursor-wand {
    cursor: url(${cursorWandImg}), auto;
  }

  &.cursor-bow {
    cursor: url(${cursorBowImg}), auto;
  }
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

interface HighlighterProps {
  $enemy: boolean;
  $team: Team;
}

export const Highlighter = styled.div.attrs((props: HighlighterProps) => ({
  className: `highlighter ${props.$team} ${props.$enemy ? 'enemy' : ''}`
}))<HighlighterProps>`
  box-shadow: 0 5px 11px #00000087;
  background: transparent;
  border-radius: 50%;
  width: 100px;
  height: 10px;
  display: block;
  position: absolute;
  bottom: -26px;
  left: -30%;
  transform: skew(-204deg, -177deg);

  &.attackers {
    border: 2px inset #e2d213;
  }

  &.defenders {
    border: 2px inset #953ac1;
  }

  &.enemy {
    border: 2px inset #9a1111;
  }
`;

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
