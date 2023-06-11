import React from 'react';
import type { Trooper } from '../../types';
import { Location, Attackers, Defenders, Tile } from './styled';
import { Character } from '../Character';

interface BattlefieldProps {
  attackers: Trooper[];
  defenders: Trooper[];
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
          {attackers.map(({ id, position, type }: Trooper) => (
            <Tile key={id} $position={position}>
              <Character type={type} id={id} />
            </Tile>
          ))}
        </Attackers>
        <Defenders>
          {defenders.map(({ id, position, type }: Trooper) => (
            <Tile key={id} $position={position}>
              <Character type={type} id={id} />
            </Tile>
          ))}
        </Defenders>
      </div>
    </Location>
  );
};
