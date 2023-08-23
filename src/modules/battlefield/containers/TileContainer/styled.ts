import styled, { css } from 'styled-components';
import type { Team, Trooper } from 'modules/battlefield/types';

type TileProps = {
  $position: number;
  $team: Trooper['team'];
};

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
            top: 120px;
            left: 640px;
            z-index: 1;
          }

          &.tile-2 {
            top: 240px;
            left: 580px;
            z-index: 3;
          }

          &.tile-3 {
            left: 510px;
            top: 360px;
            z-index: 5;
          }

          &.tile-4 {
            top: 110px;
            left: 790px;
            z-index: 2;
          }

          &.tile-5 {
            top: 230px;
            left: 730px;
            z-index: 4;
          }

          &.tile-6 {
            z-index: 6;
            top: 350px;
            left: 660px;
          }
        `;
      default:
        return css`
          &.tile-1 {
            top: 110px;
            left: 280px;
            z-index: 1;
          }

          &.tile-2 {
            top: 230px;
            left: 220px;
            z-index: 3;
          }

          &.tile-3 {
            z-index: 5;
            top: 350px;
            left: 150px;
          }

          &.tile-4 {
            top: 120px;
            left: 130px;
            z-index: 2;
          }

          &.tile-5 {
            top: 240px;
            left: 70px;
            z-index: 4;
          }

          &.tile-6 {
            top: 360px;
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

type CharacterProps = {
  $enemy: boolean;
  $active: boolean;
  $hovered: boolean;
  $team: Team;
};

export const Character = styled(Center).attrs((props: CharacterProps) => ({
  className: `character ${props.$team} ${props.$enemy ? 'enemy' : ''} ${
    props.$active ? 'active' : ''
  } ${props.$hovered ? 'hovered' : ''}`
}))<CharacterProps>`
  pointer-events: none;

  &.attackers {
    --shadow-color: ${({ theme }) => theme.colors.attackers};
  }

  &.defenders {
    --shadow-color: ${({ theme }) => theme.colors.defenders};
  }

  &.enemy {
    --shadow-color: ${({ theme }) => theme.colors.enemy};
  }

  &.hovered {
    filter: drop-shadow(-4px -4px 2px var(--shadow-color));
  }

  &.active {
    filter: drop-shadow(-4px -4px 2px var(--shadow-color));
  }
`;
