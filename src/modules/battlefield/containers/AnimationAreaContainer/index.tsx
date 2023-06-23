import React, { useRef } from 'react';
import { Area } from './styled';
import { useSelector } from 'store/hooks';
import {
  activeTrooperSelector,
  hoveredElementSelector,
  makeCharacterByIdSelector
} from '../../selectors';
import { MountainArcherArrow } from './MountainArcherArrow';

interface OwnProps {
  children: React.ReactNode;
}

export const AnimationAreaContainer = ({ children }: OwnProps) => {
  const areaAnimationRef = useRef<HTMLDivElement>(null);
  const activeTrooper = useSelector(activeTrooperSelector);
  const hoveredElement = useSelector(hoveredElementSelector);
  const selectedTrooper = useSelector(
    makeCharacterByIdSelector(hoveredElement?.id || 0)
  );
  const team = activeTrooper?.team;

  return (
    <Area ref={areaAnimationRef} $team={team}>
      <MountainArcherArrow
        team={team}
        containerNode={areaAnimationRef.current!}
        activeTrooperId={activeTrooper?.id}
        selectedTrooperId={selectedTrooper?.id}
      />
      {children}
    </Area>
  );
};
