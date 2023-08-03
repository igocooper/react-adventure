import styled, { keyframes } from 'styled-components';
import { ANCHOR_EFFECT_DURATION } from 'modules/battlefield/sagas/abilitiesSaga/abilities/anchor';
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
    animation: ${anchor} ${ANCHOR_EFFECT_DURATION}ms ease-in-out 1;
  }
`;
