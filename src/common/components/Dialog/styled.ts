import styled from 'styled-components';

export const Overlay = styled.div.attrs({
  className: 'overlay'
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;

export const HeaderContainer = styled.div.attrs({
  className: 'header'
})`
  color: #fff;
  font-family: fantasy;
  border: 5px solid var(--border-outer-color);
  border-radius: 10px;
  outline: 1px solid #000;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
`;

export const HeaderContent = styled.div`
  --header-background-color: #b7a49d;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: var(--header-background-color);
  min-height: 50px;
  min-width: 200px;
  border: 1px solid #000;
  border-radius: 6px;

  font-family: fantasy;
  font-size: 36px;
  white-space: nowrap;
  padding: 8px 16px;
  text-shadow: -1px 3px 3px rgba(66, 68, 90, 1);
  box-shadow: inset -1px 1px 24px -13px rgb(0, 0, 0);
  color: #fff;
`;

export const BorderOuter = styled.div.attrs({
  className: 'border-outer'
})`
  --border-outer-color: #504c45;
  --background-color: #734333;

  background: var(--background-color);
  position: relative;
  width: 500px;
  height: 500px;
  border: 5px solid var(--border-outer-color);
  border-radius: 10px;
  outline: 1px solid #000;
  box-shadow: 1px 7px 13px -2px rgba(0, 0, 0, 0.5);
`;

export const Corner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: var(--border-outer-color);
  z-index: 9999;
`;

export const CornerLeft = styled(Corner)`
  left: -5px;
  top: -5px;

  box-shadow: 3px 2px 1px 0 #593529;
`;

export const CornerRight = styled(Corner)`
  right: -5px;
  top: -5px;

  box-shadow: -3px 2px 1px 0 #593529;
`;

export const CornerInner = styled.div`
  --color: #a39896;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  background: var(--color);
  border: 1px solid #000;
`;

export const BorderInner = styled.div.attrs({
  className: 'border-inner'
})`
  --border-inner-color: #935846;
  --border-size: 3px;

  width: calc(100% - (var(--border-size) * 2));
  height: calc(100% - (var(--border-size) * 2));
  border: var(--border-size) inset var(--border-inner-color);
  transform: rotate3d(0, 1, 0, 180deg);

  & > *:not(${HeaderContainer}) {
    transform: rotate3d(0, 1, 0, 180deg);
  }
`;

export const Content = styled.div`
  padding: 60px 24px 24px;
  color: #fff;
  font-family: fantasy;
`;

interface SpotProps {
  $size: number;
  $x: number;
  $y: number;
}

export const Spot = styled.div<SpotProps>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  top: ${({ $y }) => $y}%;
  left: ${({ $x }) => $x}%;
  border-radius: 50%;
  filter: blur(3px);
  background: #6a3c2a;
`;

export const SpotsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
