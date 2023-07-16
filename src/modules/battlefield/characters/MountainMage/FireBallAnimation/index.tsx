import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useEffect
} from 'react';
import type { Trooper } from 'modules/battlefield/types';
import { getElementBoundsWithinContainer } from 'common/helpers';
import { getTrooperNode } from 'modules/battlefield/troopersNodesMap';
import { wait } from 'common/helpers/wait';
import { AttackImage, AttackImageContainer } from './styled';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';

type Props = {
  containerNode: HTMLElement;
  animationDuration: number;
  trooperId?: Trooper['id'];
  targetTrooperId?: Trooper['id'];
  attackId: string;
  imageWidth: number;
  imageHeight: number;
  imageUrl: string;
};

export const FireBallAnimation = forwardRef((props: Props, ref) => {
  const {
    attackId,
    animationDuration,
    containerNode,
    trooperId,
    targetTrooperId,
    imageUrl,
    imageWidth,
    imageHeight
  } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpinning, sertIsSpinning] = useState(false);

  const play = useCallback(async () => {
    sertIsSpinning(true);
    await wait(200);
    setIsPlaying(true);
    await wait(animationDuration);
    setIsPlaying(false);
    sertIsSpinning(false);
  }, [animationDuration, setIsPlaying]);

  useEffect(() => {
    registerAreaEffect(attackId, { play });
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        play
      };
    },
    [play]
  );

  if (!trooperId) {
    return null;
  }

  const characterNode = getTrooperNode(trooperId);
  const targetNode = getTrooperNode(targetTrooperId!);
  const characterBounds =
    characterNode &&
    getElementBoundsWithinContainer(characterNode, containerNode);
  const targetBounds =
    targetNode && getElementBoundsWithinContainer(targetNode, containerNode);

  const x = (characterBounds?.left || 0) + 20;
  const y = (characterBounds?.top || 0) + 20;

  return (
    <AttackImageContainer
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
      $targetBounds={targetBounds}
    >
      <AttackImage $src={imageUrl} $active={isSpinning} />
    </AttackImageContainer>
  );
});

FireBallAnimation.displayName = 'FireBall';
