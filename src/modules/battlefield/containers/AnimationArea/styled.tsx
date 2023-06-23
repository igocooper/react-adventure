import styled, { css } from 'styled-components';
import arrowImg from './arrow.png';

type AreaProps = {
  $team?: string;
};

export const Area = styled.div.attrs(({ $team }: AreaProps) => ({
  className: `${$team}`
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

type ArrowProps = {
  $active?: boolean;
  $animationDuration: number;
};

export const Arrow = styled.div<ArrowProps>`
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  width: 64px;
  height: 8px;
  position: absolute;
  transition: ${({ $animationDuration }) =>
    `transform ${$animationDuration / 1000}s ease-out`};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;

    background-image: url(${arrowImg});
  }

  .defenders &::before {
    transform: rotate3d(0, 1, 0, 180deg);
  }
`;
