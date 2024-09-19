import React, { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { SpriteAnimation } from 'modules/animation/containers/SpriteAnimation';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';
import frames from './frames';

type Props = {
  position: {
    x: number;
    y: number;
  };
};

export const IceSpike = forwardRef(
  (
    props: Props,
    ref: ForwardedRef<{
      play: CallableFunction;
    }>
  ) => {
    return (
      <SpriteAnimation
        className="ice-spike"
        ref={ref}
        src={resolveAssetUrl('/images/sprites/ice-spike.png')}
        frames={frames}
        {...props}
      />
    );
  }
);

IceSpike.displayName = 'IceSpike';
