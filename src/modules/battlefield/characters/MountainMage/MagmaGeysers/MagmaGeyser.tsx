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
        src={resolveAssetUrl('/images/sprites/magma-geyser.png')}
        frames={frames}
        fps={13}
        {...props}
      />
    );
  }
);

MagmaGeyser.displayName = 'MagmaGeyser';
