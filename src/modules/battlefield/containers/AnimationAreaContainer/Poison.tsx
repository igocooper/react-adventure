import React, { useEffect, useRef } from 'react';
import { EffectAnimation } from 'modules/animation/containers/EffectAnimation';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { EFFECT } from 'common/constants';
import type { Trooper } from '../../types';

type Props = {
  containerNode: HTMLDivElement;
  trooperId?: Trooper['id'];
};

export const Poison = (props: Props) => {
  const effectRef = useRef(null);

  useEffect(() => {
    registerAreaEffect(EFFECT.POISON, effectRef.current!);
  }, []);

  return (
    <EffectAnimation
      ref={effectRef}
      imageWidth={65}
      imageHeight={65}
      attackId={EFFECT.POISON}
      animationDuration={500}
      imageUrl="/images/effects/poison.png"
      {...props}
    />
  );
};
