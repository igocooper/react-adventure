import React, { forwardRef, useImperativeHandle, useState } from 'react';
import type { Trooper, EffectName } from 'modules/battlefield/types';
import { getElementBoundsWithinContainer } from 'common/helpers';
import { getTrooperNode } from 'modules/battlefield/troopersNodesMap';
import { wait } from 'common/helpers/wait';
import { EffectImage } from './styled';

type Props = {
  containerNode: HTMLDivElement;
  animationDuration: number;
  trooperId?: Trooper['id'];
  attackId: EffectName;
  imageWidth: number;
  imageHeight: number;
  imageUrl: string;
};

export const EffectAnimation = forwardRef((props: Props, ref) => {
  const {
    attackId,
    animationDuration,
    containerNode,
    trooperId,
    imageUrl,
    imageWidth,
    imageHeight
  } = props;
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      play: async function () {
        setIsPlaying(true);
        await wait(animationDuration);
        setIsPlaying(false);
      }
    }),
    [animationDuration, setIsPlaying]
  );

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

  return (
    <EffectImage
      $attackId={attackId}
      $active={isPlaying}
      $src={imageUrl}
      $width={imageWidth}
      $height={imageHeight}
      $animationDuration={animationDuration}
      $position={{
        x,
        y
      }}
    />
  );
});

EffectAnimation.displayName = 'EffectAnimation';
