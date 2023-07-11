import React, { Component } from 'react';
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

export class SpriteAnimation extends Component<Props, State> {
  animationStateRef: React.MutableRefObject<boolean | null>;

  constructor(props: Props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };

    this.play = this.play.bind(this);
    this.animationStateRef = React.createRef();
  }

  componentDidMount() {
    const { attackId } = this.props;

    if (attackId) {
      registerAreaEffect(attackId, this);
    }
  }

  async play() {
    const { frames, fps } = this.props;

    this.animationStateRef.current = true;

    await animate(frames, this.setState.bind(this), fps || FPS);

    this.animationStateRef.current = false;
  }

  render() {
    const { x, y, width, height } = this.state;
    const { src, position, className } = this.props;

    return (
      <MagicEffect
        className={className}
        $active={this.animationStateRef.current!}
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
  }
}
