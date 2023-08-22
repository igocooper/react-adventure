import styled from 'styled-components';

type ObjectProps = {
  $position: {
    x: number;
    y: number;
  };
  $forwardDirection: boolean;
  $time: number;
};
export const Object = styled.div<ObjectProps>`
  position: absolute;
  top: ${({ $position }) => $position.y}px;
  left: ${({ $position }) => $position.x}px;
  transform: ${({ $forwardDirection }) =>
    $forwardDirection ? 'initial' : 'rotate3d(0, 1, 0, 180deg)'};

  transition: ${({ $time }) => `left ${$time}ms linear, top ${$time}ms linear`};
`;
