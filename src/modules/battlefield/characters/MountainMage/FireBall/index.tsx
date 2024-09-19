import React from 'react';
import { createPortal } from 'react-dom';
import { AREA_CONTAINER_ID } from 'modules/battlefield/constants';
import { useSelector } from 'store/hooks';
import { FireBallAnimation } from './FireBallAnimation';
import { hoveredElementSelector } from 'modules/battlefield/selectors';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';
import type { Trooper } from 'modules/battlefield/types';

type Props = {
  id: Trooper['id'];
  attackId: string;
  position: Trooper['position'];
};

export const FireBall = ({ id, attackId, position }: Props) => {
  const hoveredElement = useSelector(hoveredElementSelector);
  const containerNode = document.getElementById(AREA_CONTAINER_ID);

  if (!containerNode) return null;

  return createPortal(
    <FireBallAnimation
      imageWidth={55}
      imageHeight={50}
      attackId={attackId}
      position={position}
      animationDuration={400}
      imageUrl={resolveAssetUrl('/images/rangeAttackItems/fireball.png')}
      trooperId={id}
      targetTrooperId={hoveredElement?.id}
      containerNode={containerNode}
    />,
    containerNode
  );
};
