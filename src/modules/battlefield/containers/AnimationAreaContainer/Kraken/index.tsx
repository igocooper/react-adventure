import React from 'react';
import { useSelector } from 'store/hooks';
import { SpriteAnimation } from 'modules/animation/containers/SpriteAnimation';
import frames from './frames';
import { activeTeamNameSelector } from 'modules/battlefield/selectors';
import { TROOPER_TEAM } from 'modules/battlefield/constants';

const FRAME_WIDTH = 384;

export const Kraken = () => {
  const activeTeamName = useSelector(activeTeamNameSelector);
  const position =
    activeTeamName === TROOPER_TEAM.ATTACKERS
      ? { x: `calc(50% + ${FRAME_WIDTH / 2}px)`, y: 50 }
      : { x: 0, y: 50 };

  return (
    <SpriteAnimation
      attackId="kraken"
      className="Kraken"
      src="/images/sprites/kraken.png"
      frames={frames}
      position={position}
    />
  );
};
