import React from 'react';
import { ABILITY } from 'common/constants';
import { SpriteAnimation } from 'modules/animation/containers/SpriteAnimation';
import { frames } from './frames';
import { getTrooperNode } from 'modules/battlefield/troopersNodesMap';
import { getElementBoundsWithinContainer } from 'common/helpers';
import type { Trooper } from 'modules/battlefield/types';

type Props = {
  trooperId?: Trooper['id'];
  containerNode: HTMLElement;
};

const FRAME_SIZE = 512;
const HEIGHT_ADJUSTMENT = 40;

export const LightningStrike = ({ containerNode, trooperId }: Props) => {
  if (!containerNode || !trooperId) return null;

  const targetNode = getTrooperNode(trooperId);
  const targetBounds = getElementBoundsWithinContainer(
    targetNode!,
    containerNode
  );
  const position = {
    x: targetBounds.left + targetBounds.width / 2 - FRAME_SIZE / 2,
    y:
      targetBounds.top +
      targetBounds.height / 2 -
      FRAME_SIZE / 2 -
      HEIGHT_ADJUSTMENT
  };

  return (
    <SpriteAnimation
      attackId={ABILITY.LIGHTNING_STRIKE}
      className="lightning"
      src="/images/sprites/lightning.png"
      frames={frames}
      position={position}
    />
  );
};
