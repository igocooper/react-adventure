import React from 'react';
import { EffectAnimation } from 'modules/animation/containers/EffectAnimation';
import type { Trooper } from '../../types';
import { EFFECT } from '../../constants';

interface Props {
  containerNode: HTMLDivElement;
  trooperId?: Trooper['id'];
}

export const Anchor = (props: Props) => {
  return (
    <EffectAnimation
      imageWidth={120}
      imageHeight={120}
      attackId={EFFECT.ANCHOR}
      animationDuration={500}
      imageUrl="/images/effects/anchor.png"
      {...props}
    />
  );
};
