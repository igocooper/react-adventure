import React from 'react';
import {
  activeTeamNameSelector,
  hoveredTrooperSelector
} from 'modules/battlefield/selectors';
import { useSelector } from 'store/hooks';
import { Info } from '../../components/Info';
import { Effect } from '../../components/Effect';
import {
  Effects,
  HoveredContainer,
  TrooperImage,
  ContainerInner
} from '../styled';

type Props = {
  imageSrc?: string;
};

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
      <ContainerInner>
        {hoveredTrooper && (
          <>
            <Effects>
              {hoveredTrooper.effects.map(
                ({ name, iconSrc, duration, description }, index) => {
                  return (
                    <Effect
                      iconSrc={iconSrc}
                      key={`${name}_${index}`}
                      duration={duration}
                      name={name}
                      description={description}
                    />
                  );
                }
              )}
            </Effects>
            <Info
              currentHealth={hoveredTrooper.currentHealth}
              health={hoveredTrooper.health}
              damage={hoveredTrooper.damage}
              damageType={hoveredTrooper.damageType}
              attackType={hoveredTrooper.attackType}
              hitChance={hoveredTrooper.hitChance}
              criticalChance={hoveredTrooper.criticalChance}
              evadeChance={hoveredTrooper.evadeChance}
              defence={hoveredTrooper.defence}
            />
          </>
        )}
        {imageSrc && <TrooperImage $src={imageSrc} $health={healthLeft} />}
      </ContainerInner>
    </HoveredContainer>
  );
};
