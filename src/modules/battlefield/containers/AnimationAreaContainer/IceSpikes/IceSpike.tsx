import React, { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { SpriteAnimation } from 'modules/animation/containers/SpriteAnimation';
import frames from './frames';

type Props = {
  position: {
    x: number;
    y: number;
  };
};

export const IceSpike = forwardRef(
  (props: Props, ref: ForwardedRef<SpriteAnimation>) => {
    return (
      <SpriteAnimation
        className="ice-spike"
        ref={ref}
        src="/images/sprites/ice-spike.png"
        frames={frames}
        {...props}
      />
    );
  }
);

IceSpike.displayName = 'IceSpike';
