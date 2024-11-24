import styled from 'styled-components';
import inkGif from './images/ink_lv2.gif';
import bgImg from './images/bg.jpg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${bgImg});
    background-size: cover;
    background-position: center;
    z-index: -1;

    mask-image: url(${inkGif});
    mask-size: cover;
    mask-position: center;
  }
`;
