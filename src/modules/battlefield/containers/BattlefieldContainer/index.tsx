import React, { useEffect } from 'react';
import { useSelector, useDispatchAction } from 'store/hooks';
import { startRound as startRoundAction } from '../../actions';
import {
  attackersSelector,
  cursorSelector,
  defendersSelector
} from '../../selectors';
import { Attackers, Defenders, Location } from './styled';
import type { Trooper } from '../../types';
import { TileContainer } from '../TileContainer';

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
      {/* TODO: Add MassAttack container */}
      <div>
        <Attackers>
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
        </Attackers>
        <Defenders>
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
        </Defenders>
      </div>
    </Location>
  );
};
