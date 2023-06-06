import React from 'react';
import type { Troop } from '../../types';
import { Location, Attackers, Defenders, Tile } from './styled';
import { Character } from '../Character';

interface BattlefieldProps {
  attackers: Troop[];
  defenders: Troop[];
}

export const Battlefield = ({ attackers, defenders }: BattlefieldProps) => {
  return (
    <Location>
      {/* TODO: Add MassAttack container */}
      <div>
        <Attackers>
          {attackers.map(({ id, position, type }: Troop) => (
            <Tile key={id} $position={position}>
              <Character type={type} />
            </Tile>
          ))}
        </Attackers>
        <Defenders>
          {defenders.map(({ id, position, type }: Troop) => (
            <Tile key={id} $position={position}>
              <Character type={type} />
            </Tile>
          ))}
        </Defenders>
      </div>
    </Location>
  );
};
