import React from 'react';
import { CharacterContainer } from 'modules/battlefield/containers/CharacterContainer';
import { HealthBar } from 'modules/battlefield/components/HealthBar';
import type { Trooper } from '../../types';
import { Location, Attackers, Defenders, Tile, Highlighter } from './styled';

interface BattlefieldProps {
  attackers: Trooper[];
  defenders: Trooper[];
  activeTrooper: Trooper;
  cursor: string;
  hoveredTrooperId: number | undefined;
}

export const Battlefield = ({
  attackers,
  defenders,
  cursor,
  activeTrooper,
  hoveredTrooperId
}: BattlefieldProps) => {
  return (
    <Location $cursor={cursor}>
      {/* TODO: Add MassAttack container */}
      <div>
        <Attackers>
          {attackers.map(
            ({ id, position, type, team, currentHealth, health }: Trooper) => {
              const active = id === activeTrooper?.id;
              const hovered = hoveredTrooperId === id;
              return (
                <Tile key={id} $position={position}>
                  {hovered && (
                    <HealthBar currentHealth={currentHealth} health={health} />
                  )}
                  <CharacterContainer type={type} id={id} team={team} />
                  {(active || hovered) && (
                    <Highlighter
                      $enemy={!active && team !== activeTrooper?.team}
                      $team={team}
                    />
                  )}
                </Tile>
              );
            }
          )}
        </Attackers>
        <Defenders>
          {defenders.map(
            ({ id, position, type, team, currentHealth, health }: Trooper) => {
              const active = id === activeTrooper?.id;
              const hovered = hoveredTrooperId === id;
              return (
                <Tile key={id} $position={position}>
                  {hovered && (
                    <HealthBar currentHealth={currentHealth} health={health} />
                  )}
                  <CharacterContainer type={type} id={id} team={team} />
                  {(active || hovered) && (
                    <Highlighter
                      $enemy={!active && team !== activeTrooper?.team}
                      $team={team}
                    />
                  )}
                </Tile>
              );
            }
          )}
        </Defenders>
      </div>
    </Location>
  );
};
