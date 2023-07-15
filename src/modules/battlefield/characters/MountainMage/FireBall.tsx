import React from 'react';
import { createPortal } from 'react-dom';
import { AREA_CONTAINER_ID } from 'modules/battlefield/constants';
import { ATTACK_ID_FIRE_BALL } from './constants';
import { useSelector } from 'store/hooks';
import { FireBallAnimation } from './FireBallAnimation';
import { hoveredElementSelector } from '../../selectors';
import type { Trooper } from 'modules/battlefield/types';

type Props = {
  id: Trooper['id'];
};

export const FireBall = ({ id }: Props) => {
  const hoveredElement = useSelector(hoveredElementSelector);
  const containerNode = document.getElementById(AREA_CONTAINER_ID);

  if (!containerNode) return null;

  return createPortal(
    <FireBallAnimation
      imageWidth={65}
      imageHeight={60}
      attackId={ATTACK_ID_FIRE_BALL}
      animationDuration={300}
      imageUrl="/images/rangeAttackItems/fireball.png"
      trooperId={id}
      targetTrooperId={hoveredElement?.id}
      containerNode={containerNode}
    />,
    containerNode
  );
};
