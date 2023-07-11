import React from 'react';
import { EffectAnimation } from 'modules/animation/containers/EffectAnimation';
import type { Trooper } from '../../types';
import { EFFECT } from 'common/constants';

type Props = {
  containerNode: HTMLDivElement;
  trooperId?: Trooper['id'];
};

export const Block = (props: Props) => {
  return (
    <EffectAnimation
      imageWidth={105}
      imageHeight={105}
      attackId={EFFECT.BLOCK}
      animationDuration={500}
      imageUrl="/images/effects/block.png"
      {...props}
    />
  );
};
