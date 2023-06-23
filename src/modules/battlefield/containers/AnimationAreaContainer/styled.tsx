import styled, { css } from 'styled-components';

interface AreaProps {
  $team?: string;
}

export const Area = styled.div.attrs(({ $team }: AreaProps) => ({
  className: `${$team || ''}`
}))<AreaProps>`
  display: flex;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);

  ${({ $team }) => {
    switch ($team) {
      case 'defenders':
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
