import styled from 'styled-components';
import slotBackgroundImg from './images/slot-background.png';

export const Overlay = styled.div.attrs({
  className: 'overlay'
})`
  position: fixed;
  top: 0;
  left: 0;
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
  --header-background-color: ${({ theme }) => theme.dialog.headerBgColor};
  position: absolute;
  background: var(--header-background-color);
  border: 5px solid var(--border-outer-color);
  border-radius: 10px;
  outline: 1px solid ${({ theme }) => theme.colors.black};
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-height: 50px;
  min-width: 200px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 6px;

  font-family: fantasy;
  color: #fff;
  font-size: 36px;
  white-space: nowrap;
  padding: 8px 16px;
  text-shadow: -1px 3px 3px rgba(66, 68, 90, 1);
  box-shadow: inset -1px 1px 24px -13px rgb(0, 0, 0);
`;

export const BorderOuter = styled.div.attrs({
  className: 'border-outer'
})`
  --border-outer-color: ${({ theme }) => theme.dialog.borderOuter};
  --background-color: ${({ theme }) => theme.dialog.background};

  background: var(--background-color);
  position: relative;
  width: 500px;
  height: 600px;
  border: 5px solid var(--border-outer-color);
  border-radius: 10px;
  outline: 1px solid ${({ theme }) => theme.colors.black};
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
`;

export const CornerLeft = styled(Corner)`
  left: -5px;
  top: -5px;

  box-shadow: 3px 2px 1px 0 ${({ theme }) => theme.dialog.cornerShadowColor};
`;

export const CornerRight = styled(Corner)`
  right: -5px;
  top: -5px;

  box-shadow: -3px 2px 1px 0 ${({ theme }) => theme.dialog.cornerShadowColor};
`;

export const CornerInner = styled.div`
  width: 40%;
  height: 40%;
  border-radius: 50%;
  background: ${({ theme }) => theme.dialog.headerBgColor};
  border: 1px solid ${({ theme }) => theme.colors.black};
`;

export const BorderInner = styled.div.attrs({
  className: 'border-inner'
})`
  --border-inner-color: ${({ theme }) => theme.dialog.borderInner};
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
  box-sizing: border-box;
  height: 100%;
  padding: 60px 24px 24px;
  color: ${({ theme }) => theme.colors.white};
  font-family: fantasy;
  overflow-y: scroll;
`;

type SpotProps = {
  $size: number;
  $x: number;
  $y: number;
  $color: string;
};

export const Spot = styled.div<SpotProps>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  top: ${({ $y }) => $y}%;
  left: ${({ $x }) => $x}%;
  border-radius: 50%;
  filter: blur(3px);
  background: ${({ $color }) => $color};
`;

export const SpotsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

type SlotProps = {
  width?: string | number;
  height?: string | number;
  padding?: string;
};

export const Slot = styled.div<SlotProps>`
  color: #fff;
  display: flex;
  justify-content: center;
  font-family: fantasy;
  box-sizing: border-box;
  background: url('${slotBackgroundImg}'), ${({ theme }) => theme.dialog.slotBg};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.dialog.slotShadow};
  padding: ${({ padding }) => padding || '0'};
  width: ${({ width }) => {
    if (typeof width === 'string') {
      return width;
    }

    if (typeof width === 'number') {
      return `${width}px`;
    }

    return '100%';
  }};

  height: ${({ height }) => {
    if (typeof height === 'string') {
      return height;
    }

    if (typeof height === 'number') {
      return `${height}px`;
    }

    return 'auto';
  }};
`;
