import React from 'react';
import { useSelector } from 'store/hooks';
import { activeTrooperSelector, hoveredTrooperSelector } from '../../selectors';
import { Interface, TrooperImage, Info, TrooperInterface } from './styled';
import { useImages } from './hooks/useImages';

export const UserInterfaceContainer = () => {
  const activeTrooper = useSelector(activeTrooperSelector);
  const hoveredTrooper = useSelector(hoveredTrooperSelector);
  const imagesMap = useImages();

  if (!activeTrooper || !imagesMap) {
    return null;
  }

  const activeTrooperImageSrc = activeTrooper && imagesMap[activeTrooper.id];
  const hoveredTrooperImageSrc = hoveredTrooper && imagesMap[hoveredTrooper.id];

  return (
    <Interface>
      <TrooperInterface>
        <TrooperImage $src={activeTrooperImageSrc} />
        <Info>
          <p>
            Health: ♥️ {activeTrooper.currentHealth} / {activeTrooper.health}
          </p>
          <p>Damage: {activeTrooper.damage}</p>
          <p>Attack type: {activeTrooper.attackType}</p>
          <p>Initiative: {activeTrooper.initiative}</p>
        </Info>
      </TrooperInterface>
      <TrooperInterface>
        <Info>
          <p>
            Health: ♥️ {activeTrooper.currentHealth} / {activeTrooper.health}
          </p>
          <p>Damage: {activeTrooper.damage}</p>
          <p>Attack type: {activeTrooper.attackType}</p>
          <p>Initiative: {activeTrooper.initiative}</p>
        </Info>
        <TrooperImage $src={hoveredTrooperImageSrc} />
      </TrooperInterface>
    </Interface>
  );
};
