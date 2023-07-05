import styled from 'styled-components';
import cursorDefaultImg from '../../images/cursors/cursor-default.png';
import cursorWandImg from '../../images/cursors/cursor-wand.png';
import cursorBowImg from '../../images/cursors/cursor-bow.png';
import cursorSwordImg from '../../images/cursors/cursor-sword.png';
import type { LocationName } from 'modules/battlefield/types';

type LocationProps = {
  $cursor: string;
  $location: LocationName;
};

export const Location = styled.div.attrs((props: LocationProps) => ({
  className: `location cursor-${props.$cursor}`
}))<LocationProps>`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  background-image: url(${({ $location }) =>
    `/images/locations/${$location}.png`});

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
