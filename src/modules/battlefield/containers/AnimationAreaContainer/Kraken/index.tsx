import React from 'react';
import { useSelector } from 'store/hooks';
import { SpriteAnimation } from 'modules/animation/containers/SpriteAnimation';
import frames from './frames';
import { activeTeamNameSelector } from 'modules/battlefield/selectors';
import { TROOPER_TEAM } from 'modules/battlefield/constants';

export const Kraken = () => {
  const activeTeamName = useSelector(activeTeamNameSelector);
  // TODO: calculate correct position
  const position =
    activeTeamName === TROOPER_TEAM.ATTACKERS
      ? {
          x: 500,
          y: 50
        }
      : {
          x: 0,
          y: 0
        };

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
