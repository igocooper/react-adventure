import React, { useRef } from 'react';
import { Area } from './styled';
import { useSelector } from 'store/hooks';
import {
  activeTrooperSelector,
  battlefieldLoadedStatusSelector,
  hoveredElementSelector,
  makeCharacterByIdSelector
} from '../../selectors';
import { Block } from './Block';
import { Poison } from './Poison';
import { Anchor } from './Anchor';
import { Heal } from './Heal';
import { Bleeding } from './Bleeding';
import { Rage } from './Rage';
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
          <Heal
            containerNode={areaAnimationRef.current!}
            trooperId={selectedTrooper?.id}
          />
          <Bleeding
            containerNode={areaAnimationRef.current!}
            trooperId={selectedTrooper?.id}
          />
          <Rage containerNode={areaAnimationRef.current!} />
        </>
      )}

      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            // @ts-expect-error
            containerNode: areaAnimationRef.current!
          });
        }

        return child;
      })}
    </Area>
  );
};
