import React, { useEffect, useState } from 'react';
import { BleedingEffect, RightCut, LeftCut } from './styled';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { EFFECT } from 'common/constants';
import type { Trooper } from 'modules/battlefield/types';
import { getElementBoundsWithinContainer, wait } from 'common/helpers';
import { getTrooperNode } from '../../../troopersNodesMap';

const BlobMask = () => (
  <svg viewBox="0 0 398.6 435.4" width="0" height="0">
    <clipPath
      id="blob1"
      clipPathUnits="objectBoundingBox"
      transform="scale(0.002508, 0.002296)"
    >
      <path
        className="st0"
        d="M332.3,48.8c32.6,18.1,58.5,49.4,64.7,83.7c6.3,34.3-7.1,71.5-15.8,107.1c-8.6,35.7-12.6,69.7-26,108.4 c-13.5,38.6-36.5,81.9-68,86.9c-31.4,5-71.5-28.3-117.1-41.8c-45.7-13.6-97.1-7.5-123.9-28.3c-26.7-20.8-28.9-68.5-35-115.4 c-6.2-46.8-16.4-92.6-8-138c8.3-45.3,35.3-90,74.7-105s91.3-0.3,136.9,9.6C260.4,25.8,299.7,30.6,332.3,48.8z"
      />
    </clipPath>
  </svg>
);

interface Props {
  containerNode: HTMLDivElement;
  trooperId?: Trooper['id'];
  leftCut?: boolean;
}
export const Bleeding = ({ leftCut, trooperId, containerNode }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    registerAreaEffect(EFFECT.BLEEDING, {
      play: async function () {
        setIsPlaying(true);
        await wait(1600); // should equal animation duration in BleedingEffect in styled
        setIsPlaying(false);
      }
    });
  }, []);

  if (!trooperId) {
    return null;
  }

  const targetNode = getTrooperNode(trooperId);
  const targetBounds = getElementBoundsWithinContainer(
    targetNode!,
    containerNode
  );
  const x = targetBounds.left + targetBounds.width / 2;
  const y = targetBounds.top + targetBounds.height / 2;
  const position = { x, y };

  return (
    <BleedingEffect $active={isPlaying} $position={position}>
      <RightCut $active={isPlaying} />
      {leftCut && <LeftCut $active={isPlaying} />}
      <BlobMask />
    </BleedingEffect>
  );
};
