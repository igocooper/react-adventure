import styled from 'styled-components';
import type { Trooper } from 'modules/battlefield/types';
import { TROOPER_TEAM } from 'modules/battlefield/constants';

interface CanvasProps {
  $team: Trooper['team'];
}

export const Canvas = styled.canvas<CanvasProps>`
  transform: ${({ $team }) =>
    $team === TROOPER_TEAM.DEFENDERS ? 'rotate3d(0, 1, 0, 180deg)' : ''};
`;
