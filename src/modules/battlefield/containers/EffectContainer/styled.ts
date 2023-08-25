import styled, { keyframes } from 'styled-components';
import { ANCHOR_EFFECT_DURATION } from 'modules/battlefield/sagas/abilitiesSaga/abilities/anchor';
import { RAGE_EFFECT_DURATION } from 'modules/battlefield/sagas/skillsSaga/skills/rage';
import { DIVINE_SHIELD_EFFECT_DURATION } from 'modules/battlefield/sagas/skillsSaga/skills/divineShield';

const divineShield = keyframes`
  0% {
    opacity: 0;
  }
  
  50% {
    transform: scale(1.5);
    opacity: 1;
  } 
  
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

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

const rage = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
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

  &.rage {
    animation: ${rage} ${RAGE_EFFECT_DURATION}ms ease-in-out 1;
  }

  &.divine-shield {
    position: relative;

    &:before {
      content: '';
      --left-color: #f9d779;
      --right-color: #f6c63b;
      --center-color: #fff;
      position: absolute;
      top: calc(50% - 85px);
      left: calc(50% - 85px);
      width: 170px;
      height: 170px;
      border-radius: 50%;
      box-shadow: inset 0 0 30px var(--center-color),
        inset 0 0 40px var(--left-color), inset -20px 0 70px var(--right-color),
        inset 20px 0 50px var(--left-color),
        inset -20px 0 50px var(--right-color), 0 0 30px var(--center-color),
        -10px 0 100px var(--left-color), 10px 0 50px var(--right-color);

      animation: ${divineShield} ${DIVINE_SHIELD_EFFECT_DURATION}ms ease-in-out
        1;
    }
  }
`;
