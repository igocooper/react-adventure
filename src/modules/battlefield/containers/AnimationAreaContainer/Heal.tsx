import React, { useEffect, useRef } from 'react';
import { EffectAnimation } from 'modules/animation/containers/EffectAnimation';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { EFFECT } from 'common/constants';
import type { Trooper } from '../../types';

type Props = {
  containerNode: HTMLDivElement;
  trooperId?: Trooper['id'];
};

export const Heal = (props: Props) => {
  const effectRef = useRef(null);

  useEffect(() => {
    registerAreaEffect(EFFECT.HEAL, effectRef.current!);
  }, []);

  return (
    <EffectAnimation
      ref={effectRef}
      imageWidth={100}
      imageHeight={100}
      attackId={EFFECT.HEAL}
      animationDuration={500}
      imageUrl="/images/effects/heal.png"
      {...props}
    />
  );
};
