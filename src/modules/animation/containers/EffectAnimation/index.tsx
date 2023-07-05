import React, { Component } from 'react';
import type { Trooper, EffectName } from 'modules/battlefield/types';
import { getElementBoundsWithinContainer } from 'common/helpers';
import { getTrooperNode } from 'modules/battlefield/troopersNodesMap';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { EffectImage } from './styled';

interface Props {
  containerNode: HTMLDivElement;
  animationDuration: number;
  trooperId?: Trooper['id'];
  attackId: EffectName;
  imageWidth: number;
  imageHeight: number;
  imageUrl: string;
}

interface State {
  isPlaying: boolean;
}

export class EffectAnimation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPlaying: false
    };

    this.play = this.play.bind(this);
  }

  componentDidMount() {
    const { attackId } = this.props;
    registerAreaEffect(attackId, this);
  }

  async play() {
    const { animationDuration } = this.props;
    await new Promise<void>((resolve) => {
      this.setState(
        {
          isPlaying: true
        },
        () => {
          setTimeout(() => {
            this.setState({
              isPlaying: false
            });
            resolve();
          }, animationDuration);
        }
      );
    });
  }

  render() {
    const { isPlaying } = this.state;
    const {
      containerNode,
      trooperId,
      animationDuration,
      imageUrl,
      imageWidth,
      imageHeight,
      attackId
    } = this.props;

    if (!trooperId) {
      return null;
    }

    const targetNode = getTrooperNode(trooperId);
    const targetBounds = getElementBoundsWithinContainer(
      targetNode!,
      containerNode
    );
    const x = targetBounds.left + targetBounds.width / 2;
    const y = targetBounds.top + targetBounds.height / 2;

    return (
      <EffectImage
        $attackId={attackId}
        $active={isPlaying}
        $src={imageUrl}
        $width={imageWidth}
        $height={imageHeight}
        $animationDuration={animationDuration}
        $position={{
          x,
          y
        }}
      />
    );
  }
}
