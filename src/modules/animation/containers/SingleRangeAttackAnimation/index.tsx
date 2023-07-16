import React, {
  forwardRef,
  useCallback,
  useState,
  useEffect,
  useImperativeHandle
} from 'react';
import type { Trooper, Team } from 'modules/battlefield/types';
import { getElementBoundsWithinContainer, wait } from 'common/helpers';
import { getTrooperNode } from 'modules/battlefield/troopersNodesMap';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { RangeAttackImage } from './styled';

type Props = {
  containerNode: HTMLElement;
  animationDuration: number;
  trooperId?: Trooper['id'];
  targetTrooperId?: Trooper['id'];
  team?: Team;
  attackId: string;
  imageWidth: number;
  imageHeight: number;
  imageUrl: string;
  imageAdjustmentY: number;
  imageAdjustmentX: number;
};

export const SingleRangeAttackAnimation = forwardRef((props: Props, ref) => {
  const {
    attackId,
    animationDuration,
    containerNode,
    trooperId,
    targetTrooperId,
    imageUrl,
    imageWidth,
    imageHeight,
    imageAdjustmentY,
    imageAdjustmentX,
    team
  } = props;
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(async () => {
    setIsPlaying(true);
    await wait(animationDuration);
    setIsPlaying(false);
  }, [animationDuration, setIsPlaying]);

  useEffect(() => {
    registerAreaEffect(attackId, {
      play
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      play
    }),
    [play]
  );

  if (!trooperId) {
    return null;
  }

  const characterNode = getTrooperNode(trooperId);
  const targetNode = getTrooperNode(targetTrooperId!);
  const characterBounds = getElementBoundsWithinContainer(
    characterNode!,
    containerNode
  );
  const targetBounds =
    targetNode && getElementBoundsWithinContainer(targetNode, containerNode);

  if (!characterBounds.left) return null;

  const adjustmentX =
    team === 'defenders' ? 0 : characterBounds.width + imageAdjustmentX;
  const position = {
    x: characterBounds.left + adjustmentX - imageWidth,
    y:
      characterBounds.top +
      characterBounds.height / 2 +
      imageAdjustmentY -
      imageHeight / 2
  };

  return (
    <RangeAttackImage
      $active={isPlaying}
      $src={imageUrl}
      $width={imageWidth}
      $height={imageHeight}
      $animationDuration={animationDuration}
      $targetBounds={targetBounds}
      $position={position}
    />
  );
});

SingleRangeAttackAnimation.displayName = 'SingleRangeAttack';
