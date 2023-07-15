import React, { useEffect, useRef } from 'react';
import { EffectAnimation } from 'modules/animation/containers/EffectAnimation';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { EFFECT } from 'common/constants';
import type { Trooper } from '../../types';

type Props = {
  containerNode: HTMLDivElement;
  trooperId?: Trooper['id'];
};

export const Block = (props: Props) => {
  const effectRef = useRef(null);

  useEffect(() => {
    registerAreaEffect(EFFECT.BLOCK, effectRef.current!);
  }, []);

  return (
    <EffectAnimation
      ref={effectRef}
      imageWidth={105}
      imageHeight={105}
      attackId={EFFECT.BLOCK}
      animationDuration={500}
      imageUrl="/images/effects/block.png"
      {...props}
    />
  );
};
