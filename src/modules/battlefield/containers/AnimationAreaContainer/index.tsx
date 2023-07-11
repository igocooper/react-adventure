import React, { useRef } from 'react';
import { Area } from './styled';
import { useSelector } from 'store/hooks';
import {
  activeTrooperSelector,
  battlefieldLoadedStatusSelector,
  hoveredElementSelector,
  makeCharacterByIdSelector
} from '../../selectors';
import { MountainArcherArrow } from './MountainArcherArrow';
import { Block } from './Block';
import { Poison } from './Poison';
import { Anchor } from './Anchor';
import { IceSpikes } from './IceSpikes';
import { Kraken } from './Kraken';
import { Heal } from './Heal';
import { MagmaGeysers } from './MagmaGeysers';
import { AREA_CONTAINER_ID } from '../../constants';

type OwnProps = {
  children: React.ReactNode;
};

export const AnimationAreaContainer = ({ children }: OwnProps) => {
  const areaAnimationRef = useRef<HTMLDivElement>(null);
  const activeTrooper = useSelector(activeTrooperSelector);
  const hoveredElement = useSelector(hoveredElementSelector);
  const battleFieldLoaded = useSelector(battlefieldLoadedStatusSelector);
  const selectedTrooper = useSelector(
    makeCharacterByIdSelector(hoveredElement?.id || 0)
  );
  const team = activeTrooper?.team;

  return (
    <Area ref={areaAnimationRef} $team={team} id={AREA_CONTAINER_ID}>
      {battleFieldLoaded && (
        <>
          <MountainArcherArrow
            team={team}
            containerNode={areaAnimationRef.current!}
            activeTrooperId={activeTrooper?.id}
            selectedTrooperId={selectedTrooper?.id}
          />
          <Block
            containerNode={areaAnimationRef.current!}
            trooperId={activeTrooper?.id}
          />
          <Poison
            containerNode={areaAnimationRef.current!}
            trooperId={selectedTrooper?.id}
          />
          <Anchor
            containerNode={areaAnimationRef.current!}
            trooperId={activeTrooper?.id}
          />
          <IceSpikes />
          <Kraken />
          <MagmaGeysers />
          <Heal
            containerNode={areaAnimationRef.current!}
            trooperId={selectedTrooper?.id}
          />
        </>
      )}
      {children}
    </Area>
  );
};
