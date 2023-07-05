import styled, { keyframes } from 'styled-components';

const POSITION_ADJUSTMENT = 70;

export const DamageIndicator = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: none;
`;

const blow = keyframes`
  0% {
    opacity: 0;
    transform:translate(0, 0);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform:translate(0, -50px) scale(.2);
  }
`;

type DamageItemProps = {
  $isCriticalDamage?: boolean;
  $isPoison?: boolean;
  $position: { x: number; y: number };
  $miss?: boolean;
};

export const DamageItem = styled.span<DamageItemProps>`
  opacity: 0;
  color: ${({ theme, $isCriticalDamage, $miss, $isPoison }) =>
    $isPoison
      ? theme.color.poison
      : $isCriticalDamage && !$miss
      ? theme.color.critical
      : theme.color.white};
  font-size: 42px;
  font-weight: 600;
  position: absolute;
  left: ${({ $position }) => $position.x}px;
  top: ${({ $position }) => $position.y - POSITION_ADJUSTMENT}px;
  animation: ${blow} 2000ms linear;
`;
