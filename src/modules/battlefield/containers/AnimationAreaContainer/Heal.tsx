import React from 'react';
import { EffectAnimation } from 'modules/animation/containers/EffectAnimation';
import type { Trooper } from '../../types';
import { EFFECT } from '../../constants';

type Props = {
  containerNode: HTMLDivElement;
  trooperId?: Trooper['id'];
};

export const Heal = (props: Props) => {
  return (
    <EffectAnimation
      imageWidth={100}
      imageHeight={100}
      attackId={EFFECT.HEAL}
      animationDuration={500}
      imageUrl="/images/effects/heal.png"
      {...props}
    />
  );
};
