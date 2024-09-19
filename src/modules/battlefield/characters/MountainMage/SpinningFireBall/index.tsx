import React from 'react';
import { createPortal } from 'react-dom';
import { AREA_CONTAINER_ID } from 'modules/battlefield/constants';
import { useSelector } from 'store/hooks';
import { FireBallAnimation } from './FireBallAnimation';
import {
  hoveredElementSelector,
  makeCharacterByIdSelector
} from 'modules/battlefield/selectors';
import type { Trooper } from 'modules/battlefield/types';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';

type Props = {
  id: Trooper['id'];
  attackId: string;
  position: Trooper['position'];
};

export const FireBall = ({ id, attackId, position }: Props) => {
  const hoveredElement = useSelector(hoveredElementSelector);
  const trooper = useSelector(makeCharacterByIdSelector(id));
  const containerNode = document.getElementById(AREA_CONTAINER_ID);
  const team = trooper?.team;

  if (!containerNode || !team) return null;

  return createPortal(
    <FireBallAnimation
      imageWidth={35}
      imageHeight={30}
      attackId={attackId}
      animationDuration={400}
      imageUrl={resolveAssetUrl('/images/rangeAttackItems/fireball.png')}
      trooperId={id}
      targetTrooperId={hoveredElement?.id}
      containerNode={containerNode}
      team={team}
      position={position}
    />,
    containerNode
  );
};
