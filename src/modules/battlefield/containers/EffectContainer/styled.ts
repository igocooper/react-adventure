import styled, { keyframes } from 'styled-components';

const anchor = keyframes`
  0% {
    filter: invert(0);
  }
  50% {
    filter: invert(1);
  }
  100% {
    filter: invert(0);
  }
`;

export const Effect = styled.div.attrs({
  className: 'effect-container'
})`
  width: 100%;
  height: 100%;

  &.anchor {
    animation: ${anchor} 1.5s ease-in-out 1;
  }
`;
