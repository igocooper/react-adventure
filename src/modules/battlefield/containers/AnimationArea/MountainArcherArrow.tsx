import React from 'react';
import { SingleRangeAttackAnimation } from '../../../animation/containers/SingleRangeAttackAnimation';
import { type Team, type Trooper } from '../../types';

interface Props {
  containerNode: HTMLDivElement;
  activeTrooperId?: Trooper['id'];
  selectedTrooperId?: Trooper['id'];
  team?: Team;
}

export const MountainArcherArrow = (props: Props) => {
  return (
    <SingleRangeAttackAnimation
      imageWidth={64}
      imageHeight={8}
      attackId="mountainArcherArrow"
      animationDuration={200}
      imageUrl="/images/rangeAttackItems/mountainArcherArrow.png"
      imageAdjustmentY={22}
      imageAdjustmentX={0}
      {...props}
    />
  );
};
