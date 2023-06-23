import React, { useRef } from 'react';
import { Area } from './styled';
import { useSelector } from 'store/hooks';
import {
  activeTrooperSelector,
  hoveredElementSelector,
  makeCharacterByIdSelector
} from '../../selectors';
import { Arrow } from './Arrow';

type OwnProps = {
  children: React.ReactNode;
};

export const AnimationArea = ({ children }: OwnProps) => {
  const areaAnimationRef = useRef<HTMLDivElement>(null);
  const activeTrooper = useSelector(activeTrooperSelector);
  const hoveredElement = useSelector(hoveredElementSelector);
  const selectedTrooper = useSelector(
    makeCharacterByIdSelector(hoveredElement?.id || 103)
  );
  const team = activeTrooper && activeTrooper.team;

  return (
    <Area ref={areaAnimationRef} $team={team}>
      <Arrow
        team={team}
        containerNode={areaAnimationRef.current!}
        animationDuration={300}
        activeTrooperId={activeTrooper?.id}
        selectedTrooperId={selectedTrooper?.id}
      />
      {children}
    </Area>
  );
};
