import styled, { keyframes, css } from 'styled-components';
import bloodImg from './images/blood.png';

const leftCut = keyframes`
  0% {
    top: -100%;
    left: -100%;
  }
  
  100% {
    top: 0;
    left: 0;
  }
`;

const rightCut = keyframes`
  0% {
    top: 0;
    left: 100%;
  }
  
  100% {
    top: 100%;
    left: 0;
  }
`;

const bleed = keyframes`
  0% {
    border-color: #000;
    background-position: 0 -150px;
    background-size: 100%
  }

  100% {
    border-color: #6b0808;
    background-position: -50px 0;
    background-size: 150%;
  }
`;

type Props = {
  $active: boolean;
};

export const BleedingEffect = styled.div<
  Props & {
    $position: {
      x: number;
      y: number;
    };
  }
>`
  --cut-animation-speed: 300ms;
  --bleed-animation-speed: 800ms;
  --bleed-timing-function: ease-out;
  --bleed-animation-delay: 250ms;
  overflow: hidden;
  width: 100px;
  height: 100px;
  clip-path: url('#blob1');

  position: absolute;
  top: ${({ $position }) => $position.y}px;
  left: ${({ $position }) => $position.x}px;
  transform: translate(-50%, -50%);
  z-index: 99;
  pointer-events: none;

  display: ${({ $active }) => ($active ? 'block' : 'none')};
`;

export const LeftCut = styled.div<Props>`
  position: absolute;
  border-top: 3px solid #000;
  background-position: 0 0;

  background: url('${bloodImg}');

  width: 140%;
  height: 100%;
  background-size: 100%;
  background-position: 0 -150px;
  background-repeat: no-repeat;
  transform-origin: top left;
  transform: rotate(45deg);

  ${({ $active }) =>
    $active
      ? css`
          animation: ${leftCut} var(--cut-animation-speed) ease-in 0s 1,
            ${bleed} calc(var(--cut-animation-speed) * 1.5)
              var(--bleed-timing-function) var(--bleed-animation-delay) 1;
          animation-fill-mode: forwards;
        `
      : css``};
`;

export const RightCut = styled.div<Props>`
  position: absolute;
  left: 100%;
  border-top: 3px solid #000;
  background-position: 0 0;

  background: url('${bloodImg}');

  width: 140%;
  height: 100%;
  background-size: 100%;
  background-position: 0 -150px;
  background-repeat: no-repeat;
  transform-origin: top left;
  transform: rotate(-45deg);

  ${({ $active }) =>
    $active
      ? css`
          animation: ${rightCut} var(--cut-animation-speed) ease-in
              calc(var(--cut-animation-speed) / 2) 1,
            ${bleed} calc(var(--cut-animation-speed) * 2)
              var(--bleed-timing-function) var(--bleed-animation-delay) 1;
          animation-fill-mode: forwards;
        `
      : css``};
`;
