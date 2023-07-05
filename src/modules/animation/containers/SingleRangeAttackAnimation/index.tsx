import React, { Component } from 'react';
import type { Trooper, Team } from 'modules/battlefield/types';
import { getElementBoundsWithinContainer } from 'common/helpers';
import { getTrooperNode } from 'modules/battlefield/troopersNodesMap';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { RangeAttackImage } from './styled';

type Props = {
  containerNode: HTMLDivElement;
  animationDuration: number;
  activeTrooperId?: Trooper['id'];
  selectedTrooperId?: Trooper['id'];
  team?: Team;
  attackId: string;
  imageWidth: number;
  imageHeight: number;
  imageUrl: string;
  imageAdjustmentY: number;
  imageAdjustmentX: number;
};

type State = {
  isPlaying: boolean;
};

export class SingleRangeAttackAnimation extends Component<Props, State> {
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

  getInitialStyles(characterBounds: DOMRect) {
    const { width, height, left, top } = characterBounds;
    const {
      team,
      imageAdjustmentY,
      imageAdjustmentX,
      imageWidth,
      imageHeight
    } = this.props;
    const adjustmentX = team === 'defenders' ? 0 : width + imageAdjustmentX;

    return {
      left: left + adjustmentX - imageWidth,
      top: top + height / 2 + imageAdjustmentY - imageHeight / 2,
      width: `${imageWidth}px`,
      height: `${imageHeight}px`,
      zIndex: '99'
    };
  }

  getTargetStyles(characterBounds: DOMRect, targetBounds: DOMRect) {
    const { imageHeight, imageWidth } = this.props;
    const initialStyles = this.getInitialStyles(characterBounds);

    const {
      left: targetLeft,
      width: targetWidth,
      height: targetHeight,
      top: targetTop
    } = targetBounds;
    const targetLeftCenter = targetLeft + targetWidth / 2 - imageWidth / 2;
    const targetTopCenter = targetTop + targetHeight / 2 - imageHeight / 2;

    const { left, top } = initialStyles;

    const transformX = targetLeftCenter - left;
    const transformY = targetTopCenter - top;

    return {
      ...initialStyles,
      transform: `translate(${transformX}px, ${transformY}px)`
    };
  }

  render() {
    const { isPlaying } = this.state;
    const {
      containerNode,
      activeTrooperId,
      selectedTrooperId,
      animationDuration,
      imageUrl,
      imageWidth,
      imageHeight
    } = this.props;

    if (!activeTrooperId || !selectedTrooperId) {
      return null;
    }

    const characterNode = getTrooperNode(activeTrooperId);
    const targetNode = getTrooperNode(selectedTrooperId);
    const characterBounds = getElementBoundsWithinContainer(
      characterNode!,
      containerNode
    );
    const targetBounds = getElementBoundsWithinContainer(
      targetNode!,
      containerNode
    );

    if (!characterBounds.left || !targetBounds.left) return null;

    return (
      <RangeAttackImage
        $active={isPlaying}
        $src={imageUrl}
        $width={imageWidth}
        $height={imageHeight}
        $animationDuration={animationDuration}
        style={
          isPlaying
            ? this.getTargetStyles(characterBounds, targetBounds)
            : this.getInitialStyles(characterBounds)
        }
      />
    );
  }
}
