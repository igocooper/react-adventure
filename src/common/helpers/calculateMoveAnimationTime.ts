import type { Position } from 'common/types';
export const MOVEMENT_ANIMATION_SPEED = 0.3;

export const calculateMoveAnimationTime = (currentPosition: Position, previousPosition: Position) => {
  const { x, y } = currentPosition;
  // hypotenuse a^2 + b^2 = c^2
  const distance = Math.floor(
    Math.sqrt(
      Math.pow(Math.abs(previousPosition.x - x), 2) +
        Math.pow(Math.abs(previousPosition.y - y), 2)
    )
  );

  return distance / MOVEMENT_ANIMATION_SPEED;
};
