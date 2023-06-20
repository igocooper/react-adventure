import styled from 'styled-components';
import type { Team } from 'modules/battlefield/types';
import { Defenders } from 'modules/battlefield/containers/BattlefieldContainer/styled';

interface TileProps {
  $position: number;
}

export const Tile = styled.div.attrs((props: { $position: number }) => ({
  className: `tile tile-${props.$position}`
}))<TileProps>`
  position: absolute;
  width: 70px;
  height: 100px;

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

export const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

interface CharacterProps {
  $enemy: boolean;
  $active: boolean;
  $hovered: boolean;
  $team: Team;
}

export const Character = styled(Center).attrs((props: CharacterProps) => ({
  className: `character ${props.$team} ${props.$enemy ? 'enemy' : ''} ${
    props.$active ? 'active' : ''
  } ${props.$hovered ? 'hovered' : ''}`
}))<CharacterProps>`
  pointer-events: none;

  &.attackers {
    --shadow-color: #e2d213;
  }

  &.defenders {
    --shadow-color: #32a265;
  }

  &.enemy {
    --shadow-color: #9a1111;
  }

  &.hovered {
    filter: drop-shadow(-4px -4px 2px var(--shadow-color));
  }

  &.active {
    filter: drop-shadow(-4px -4px 2px var(--shadow-color));
  }
`;
