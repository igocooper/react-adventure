import React, { useEffect } from 'react';
import { useSelector, useDispatchAction } from 'store/hooks';
import { startRound as startRoundAction } from '../../actions';
import {
  attackersSelector,
  cursorSelector,
  defendersSelector
} from '../../selectors';
import { Location } from './styled';
import type { Trooper } from '../../types';
import { TileContainer } from '../TileContainer';
import { AnimationAreaContainer } from '../AnimationAreaContainer';

export const BattlefieldContainer = () => {
  const attackers = useSelector(attackersSelector);
  const defenders = useSelector(defendersSelector);
  const cursor = useSelector(cursorSelector);
  const startRound = useDispatchAction(startRoundAction);

  useEffect(() => {
    startRound(1);
  }, []);

  return (
    <Location $cursor={cursor}>
      <AnimationAreaContainer id="area-container">
        {attackers.map(
          ({ id, position, type, team, currentHealth, health }: Trooper) => (
            <TileContainer
              key={id}
              type={type}
              id={id}
              currentHealth={currentHealth}
              health={health}
              position={position}
              team={team}
            />
          )
        )}
        {defenders.map(
          ({ id, position, type, team, currentHealth, health }: Trooper) => (
            <TileContainer
              key={id}
              type={type}
              id={id}
              currentHealth={currentHealth}
              health={health}
              position={position}
              team={team}
            />
          )
        )}
      </AnimationAreaContainer>
    </Location>
  );
};
