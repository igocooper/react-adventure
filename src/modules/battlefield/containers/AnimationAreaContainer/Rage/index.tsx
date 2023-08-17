import React from 'react';
import { useSelector } from 'store/hooks';
import { SKILL } from 'common/constants';
import { activeTrooperSelector } from 'modules/battlefield/selectors';
import { SpriteAnimation } from 'modules/animation/containers/SpriteAnimation';
import { frames } from './frames';
import { getTrooperNode } from 'modules/battlefield/troopersNodesMap';
import { getElementBoundsWithinContainer } from 'common/helpers';

type Props = {
  containerNode: HTMLElement;
};

export const Rage = ({ containerNode }: Props) => {
  const activeTrooper = useSelector(activeTrooperSelector);

  if (!containerNode || !activeTrooper) return null;

  const targetNode = getTrooperNode(activeTrooper.id);
  const targetBounds = getElementBoundsWithinContainer(
    targetNode!,
    containerNode
  );
  const position = {
    x: targetBounds.left,
    y: targetBounds.top
  };

  return (
    <SpriteAnimation
      attackId={SKILL.RAGE}
      className="Rage"
      src="/images/sprites/rage.png"
      frames={frames}
      position={position}
    />
  );
};
