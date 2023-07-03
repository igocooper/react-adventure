import React from 'react';
import { EffectAnimation } from 'modules/animation/containers/EffectAnimation';
import type { Trooper } from '../../types';
import { EFFECT } from '../../constants';

interface Props {
  containerNode: HTMLDivElement;
  activeTrooperId?: Trooper['id'];
}

export const Block = (props: Props) => {
  return (
    <EffectAnimation
      imageWidth={75}
      imageHeight={112}
      attackId={EFFECT.BLOCK}
      animationDuration={500}
      imageUrl="/images/effects/block.png"
      {...props}
    />
  );
};