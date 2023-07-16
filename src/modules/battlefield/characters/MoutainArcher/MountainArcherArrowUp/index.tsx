import React from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpAnimation } from './ArrowUpAnimation';
import { AREA_CONTAINER_ID } from 'modules/battlefield/constants';
import { ATTACK_ID_UP } from '../constants';
import { useSelector } from 'store/hooks';
import {
  activeTrooperSelector,
  hoveredElementSelector,
  makeCharacterByIdSelector
} from '../../../selectors';

export const MountainArcherArrowUp = () => {
  const activeTrooper = useSelector(activeTrooperSelector);
  const hoveredElement = useSelector(hoveredElementSelector);
  const selectedTrooper = useSelector(
    makeCharacterByIdSelector(hoveredElement?.id || 0)
  );
  const team = activeTrooper?.team;
  const containerNode = document.getElementById(AREA_CONTAINER_ID);

  if (!containerNode) return null;

  return createPortal(
    <ArrowUpAnimation
      imageWidth={64}
      imageHeight={8}
      attackId={ATTACK_ID_UP}
      animationDuration={500}
      imageUrl="/images/rangeAttackItems/mountainArcherArrow.png"
      imageAdjustmentY={22}
      imageAdjustmentX={0}
      trooperId={activeTrooper?.id}
      targetTrooperId={selectedTrooper?.id}
      team={team}
      containerNode={containerNode}
    />,
    containerNode
  );
};
