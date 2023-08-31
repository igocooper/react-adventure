import styled from 'styled-components';

type ObjectProps = {
  position: {
    x: number;
    y: number;
  };
  forwardDirection: boolean;
  time: number;
  zIndex: number;
};
export const Object = styled.div<ObjectProps>`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: ${({ zIndex }) => zIndex};

  position: absolute;
  top: ${({ position }) => position.y}px;
  left: ${({ position }) => position.x}px;
  transform: ${({ forwardDirection }) =>
    forwardDirection ? 'initial' : 'rotate3d(0, 1, 0, 180deg)'};

  transition: ${({ time }) => `left ${time}ms linear, top ${time}ms linear`};
`;