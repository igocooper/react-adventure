import React from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'store/hooks';
import { SpriteAnimation } from 'modules/animation/containers/SpriteAnimation';
import frames from './frames';
import { activeTeamNameSelector } from 'modules/battlefield/selectors';
import { TROOPER_TEAM } from 'modules/battlefield/constants';
import { ATTACK_ID_KRAKEN } from '../constants';

const FRAME_WIDTH = 384;

type Props = {
  containerNode: HTMLElement;
};

export const Kraken = ({ containerNode }: Props) => {
  const activeTeamName = useSelector(activeTeamNameSelector);
  const position =
    activeTeamName === TROOPER_TEAM.ATTACKERS
      ? { x: `calc(50% + ${FRAME_WIDTH / 2}px)`, y: 50 }
      : { x: 0, y: 50 };

  if (!containerNode) return null;

  return createPortal(
    <SpriteAnimation
      attackId={ATTACK_ID_KRAKEN}
      className="Kraken"
      src="/images/sprites/kraken.png"
      frames={frames}
      position={position}
    />,
    containerNode
  );
};
