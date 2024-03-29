import styled, { css } from 'styled-components';
import { TROOPER_TEAM } from '../../constants';

type AreaProps = {
  $team?: string;
};

export const Area = styled.div.attrs(({ $team }: AreaProps) => ({
  className: `${$team || ''}`
}))<AreaProps>`
  display: flex;
  top: 50%;
  width: 880px;
  height: 500px;
  position: absolute;
  transform: translateY(calc(-50% + 50px));
  -webkit-box-pack: start;
  justify-content: flex-start;

  ${({ $team }) => {
    switch ($team) {
      case TROOPER_TEAM.DEFENDERS:
        return css`
          justify-content: flex-start;
        `;
      default:
        return css`
          justify-content: flex-end;
        `;
    }
  }}
`;
