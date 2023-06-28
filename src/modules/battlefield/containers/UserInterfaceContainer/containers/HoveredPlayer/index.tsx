import React from 'react';
import {
  activeTeamNameSelector,
  hoveredTrooperSelector
} from 'modules/battlefield/selectors';
import { useSelector } from 'store/hooks';
import { Info } from '../../components/Info';
import { HoveredContainer, TrooperImage } from '../styled';

interface Props {
  imageSrc?: string;
}

export const HoveredPlayer = ({ imageSrc }: Props) => {
  const hoveredTrooper = useSelector(hoveredTrooperSelector);
  const activeTrooperTeamName = useSelector(activeTeamNameSelector);

  const healthLeft =
    hoveredTrooper &&
    Math.round((hoveredTrooper.currentHealth / hoveredTrooper.health) * 100);

  return (
    <HoveredContainer
      $teamName={activeTrooperTeamName}
      $enemy={activeTrooperTeamName !== hoveredTrooper?.team}
    >
      {hoveredTrooper && (
        <Info
          currentHealth={hoveredTrooper.currentHealth}
          health={hoveredTrooper.health}
          damage={hoveredTrooper.damage}
          attackType={hoveredTrooper.attackType}
          initiative={hoveredTrooper.initiative}
          criticalChance={hoveredTrooper.criticalChance}
        />
      )}
      {imageSrc && <TrooperImage $src={imageSrc} $health={healthLeft} />}
    </HoveredContainer>
  );
};
