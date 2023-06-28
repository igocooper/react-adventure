import styled, { css } from 'styled-components';
import type { Team, Trooper } from 'modules/battlefield/types';

interface TileProps {
  $position: number;
  $team: Trooper['team'];
}

export const Tile = styled.div.attrs(
  (props: { $position: number; $team: Trooper['team'] }) => ({
    className: `tile tile-${props.$position} tile-${props.$team}`
  })
)<TileProps>`
  position: absolute;
  width: 70px;
  height: 100px;

  ${({ $team }) => {
    switch ($team) {
      case 'defenders':
        return css`
          &.tile-1 {
            top: 150px;
            left: 640px;
            z-index: 2;
          }

          &.tile-2 {
            top: 270px;
            left: 580px;
            z-index: 4;
          }

          &.tile-3 {
            left: 510px;
            top: 390px;
            z-index: 6;
          }

          &.tile-4 {
            top: 140px;
            left: 790px;
            z-index: 1;
          }

          &.tile-5 {
            top: 260px;
            left: 730px;
            z-index: 3;
          }

          &.tile-6 {
            z-index: 5;
            top: 380px;
            left: 660px;
          }
        `;
      default:
        return css`
          &.tile-1 {
            top: 140px;
            left: 280px;
            z-index: 1;
          }

          &.tile-2 {
            top: 260px;
            left: 220px;
            z-index: 3;
          }

          &.tile-3 {
            z-index: 5;
            top: 380px;
            left: 150px;
          }

          &.tile-4 {
            top: 150px;
            left: 130px;
            z-index: 2;
          }

          &.tile-5 {
            top: 270px;
            left: 70px;
            z-index: 4;
          }

          &.tile-6 {
            top: 390px;
            left: 0;
            z-index: 6;
          }
        `;
    }
  }}
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
    --shadow-color: ${({ theme }) => theme.color.attackers};
  }

  &.defenders {
    --shadow-color: ${({ theme }) => theme.color.defenders};
  }

  &.enemy {
    --shadow-color: ${({ theme }) => theme.color.enemy};
  }

  &.hovered {
    filter: drop-shadow(-4px -4px 2px var(--shadow-color));
  }

  &.active {
    filter: drop-shadow(-4px -4px 2px var(--shadow-color));
  }
`;
