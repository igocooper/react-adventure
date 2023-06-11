import React from 'react';
import type { Troop } from '../../types';
import { Location, Attackers, Defenders, Tile } from './styled';
import { Character } from '../Character';

interface BattlefieldProps {
  attackers: Troop[];
  defenders: Troop[];
  cursor: string;
}

export const Battlefield = ({
  attackers,
  defenders,
  cursor
}: BattlefieldProps) => {
  return (
    <Location $cursor={cursor}>
      {/* TODO: Add MassAttack container */}
      <div>
        <Attackers>
          {attackers.map(({ id, position, type }: Troop) => (
            <Tile key={id} $position={position}>
              <Character type={type} id={id} />
            </Tile>
          ))}
        </Attackers>
        <Defenders>
          {defenders.map(({ id, position, type }: Troop) => (
            <Tile key={id} $position={position}>
              <Character type={type} id={id} />
            </Tile>
          ))}
        </Defenders>
      </div>
    </Location>
  );
};
