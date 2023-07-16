import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { MagicEffect } from './styled';
import type { Frames } from '../../helpers/animate';
import { animate } from '../../helpers/animate';

const FPS = 20;

type Props = {
  attackId?: string;
  src: string;
  frames: Frames;
  position: {
    x: number | string;
    y: number | string;
  };
  className?: string;
  fps?: number;
};

type State = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const SpriteAnimation = forwardRef((props: Props, ref) => {
  const { frames, fps, attackId } = props;
  const animationStateRef = useRef(false);
  const [bgPosition, setBgPosition] = useState<State>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  const play = useCallback(async () => {
    animationStateRef.current = true;

    await animate(frames, setBgPosition, fps || FPS);

    animationStateRef.current = false;
  }, [setBgPosition]);

  useEffect(() => {
    if (attackId) {
      registerAreaEffect(attackId, {
        play
      });
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      play
    }),
    [play]
  );

  const { x, y, width, height } = bgPosition;
  const { src, position, className } = props;

  return (
    <MagicEffect
      className={className}
      $active={animationStateRef.current}
      $src={src}
      $width={width}
      $height={height}
      $bgPosition={{
        x,
        y
      }}
      $position={position}
    />
  );
});

SpriteAnimation.displayName = 'SpriteAnimation';
