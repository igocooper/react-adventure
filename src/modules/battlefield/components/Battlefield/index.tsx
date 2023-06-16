import React from 'react';
import { CharacterContainer } from 'modules/battlefield/containers/CharacterContainer';
import { HealthBar } from 'modules/battlefield/components/HealthBar';
import type { Trooper } from '../../types';
import { Location, Attackers, Defenders, Tile } from './styled';

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
          {attackers.map(
            ({ id, position, type, team, currentHealth, health }: Trooper) => (
              <Tile key={id} $position={position}>
                <HealthBar currentHealth={currentHealth} health={health} />
                <CharacterContainer type={type} id={id} team={team} />
              </Tile>
            )
          )}
        </Attackers>
        <Defenders>
          {defenders.map(
            ({ id, position, type, team, currentHealth, health }: Trooper) => (
              <Tile key={id} $position={position}>
                <HealthBar currentHealth={currentHealth} health={health} />
                <CharacterContainer type={type} id={id} team={team} />
              </Tile>
            )
          )}
        </Defenders>
      </div>
    </Location>
  );
};
