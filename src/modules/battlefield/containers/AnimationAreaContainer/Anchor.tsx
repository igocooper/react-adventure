import React, { useEffect, useRef } from 'react';
import { EffectAnimation } from 'modules/animation/containers/EffectAnimation';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { EFFECT } from 'common/constants';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';
import type { Trooper } from '../../types';
interface Props {
  containerNode: HTMLDivElement;
  trooperId?: Trooper['id'];
}

export const Anchor = (props: Props) => {
  const effectRef = useRef(null);

  useEffect(() => {
    registerAreaEffect(EFFECT.ANCHOR, effectRef.current!);
  }, []);

  return (
    <EffectAnimation
      ref={effectRef}
      attackId={EFFECT.ANCHOR}
      imageWidth={80}
      imageHeight={80}
      animationDuration={700}
      imageUrl={resolveAssetUrl('images/effects/anchor.png')}
      {...props}
    />
  );
};
