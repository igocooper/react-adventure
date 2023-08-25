import React, { useEffect, useState } from 'react';
import { SKILL } from 'common/constants';
import { getTrooperNode } from 'modules/battlefield/troopersNodesMap';
import { getElementBoundsWithinContainer, wait } from 'common/helpers';
import type { Trooper } from 'modules/battlefield/types';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { Ray } from './styled';

type Props = {
  trooperId?: Trooper['id'];
  containerNode: HTMLElement;
};

const RAY_WIDTH = 100;
export const ANIMATION_SPEED = 1000;
export const Resurrection = ({ containerNode, trooperId }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    registerAreaEffect(SKILL.RESURRECTION, {
      play: async function () {
        setIsPlaying(true);
        await wait(ANIMATION_SPEED);
        setIsPlaying(false);
      }
    });
  }, []);

  if (!containerNode || !trooperId) return null;

  const targetNode = getTrooperNode(trooperId);
  const targetBounds = getElementBoundsWithinContainer(
    targetNode!,
    containerNode
  );

  const { bottom: rayHeight } = targetNode!.getBoundingClientRect();

  const position = {
    x: targetBounds.left + targetBounds.width / 2 - RAY_WIDTH / 2,
    y: targetBounds.bottom
  };

  return (
    <Ray
      active={isPlaying}
      className="resurrection"
      position={position}
      width={RAY_WIDTH}
      height={rayHeight}
      animationSpeed={ANIMATION_SPEED}
    />
  );
};
