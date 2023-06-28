import React from 'react';
import { useSelector } from 'store/hooks';
import { activeTrooperSelector, hoveredTrooperSelector } from '../../selectors';
import { Interface } from './styled';
import { useImages } from './hooks/useImages';
import { ActivePlayer } from './containers/ActivePlayer';
import { HoveredPlayer } from './containers/HoveredPlayer';

export const UserInterfaceContainer = () => {
  const activeTrooper = useSelector(activeTrooperSelector);
  const hoveredTrooper = useSelector(hoveredTrooperSelector);
  const imagesMap = useImages();

  const activeTrooperImageSrc = activeTrooper && imagesMap?.[activeTrooper.id];
  const hoveredTrooperImageSrc =
    hoveredTrooper && imagesMap?.[hoveredTrooper.id];

  return (
    <Interface>
      <ActivePlayer imageSrc={activeTrooperImageSrc} />
      <HoveredPlayer imageSrc={hoveredTrooperImageSrc} />
    </Interface>
  );
};
