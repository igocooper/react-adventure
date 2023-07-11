import React from 'react';
import { EffectAnimation } from 'modules/animation/containers/EffectAnimation';
import type { Trooper } from '../../types';
import { EFFECT } from 'common/constants';

type Props = {
  containerNode: HTMLDivElement;
  trooperId?: Trooper['id'];
};

export const Poison = (props: Props) => {
  return (
    <EffectAnimation
      imageWidth={65}
      imageHeight={65}
      attackId={EFFECT.POISON}
      animationDuration={500}
      imageUrl="/images/effects/poison.png"
      {...props}
    />
  );
};
