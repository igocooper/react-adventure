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

export const MagmaGeyser = forwardRef(
  (
    props: Props,
    ref: ForwardedRef<{
      play: CallableFunction;
    }>
  ) => {
    return (
      <SpriteAnimation
        className="magma-geyser"
        ref={ref}
        src="/images/sprites/magma-geyser.png"
        frames={frames}
        fps={15}
        {...props}
      />
    );
  }
);

MagmaGeyser.displayName = 'MagmaGeyser';
