import React, { Component } from 'react';
import { Trooper, Team } from 'modules/battlefield/types';
import { getElementBoundsWithinContainer } from 'modules/battlefield/helpers/get-element-bounds-within-container';
import * as styled from './styled';
import { getTrooperNode } from '../../troopersNodesMap';
import { register } from '../../../animation/troopersAnimationInstances';

type Props = {
  containerNode: HTMLDivElement;
  animationDuration: number;
  activeTrooperId?: Trooper['id'];
  selectedTrooperId?: Trooper['id'];
  team: Team;
};

type State = {
  isPlaying: boolean;
};

const ARCHER_ATTACK = 'arrow';
const ARROW_WIDTH = 64;
const ARROW_HEIGHT = 8;

export class Arrow extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPlaying: false
    };

    this.play = this.play.bind(this);
  }

  componentDidMount() {
    register(ARCHER_ATTACK, this);
  }

  play() {
    const { animationDuration } = this.props;
    return new Promise<void>((resolve) => {
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

  getArrowStyles(characterBounds: DOMRect) {
    const { width, height, left, top } = characterBounds;
    const { team } = this.props;
    const THRESHOLD = 22;
    const safeLeft =
      team === 'defenders' ? left - ARROW_WIDTH : left + width - ARROW_WIDTH;

    return {
      left: safeLeft,
      top: top + height / 2 + THRESHOLD - ARROW_HEIGHT / 2,
      width: `${ARROW_WIDTH}px`,
      height: `${ARROW_HEIGHT}px`,
      zIndex: '99'
    };
  }

  getArrowTargetStyles(characterBounds: DOMRect, targetBounds: DOMRect) {
    const initialStyles = this.getArrowStyles(characterBounds);

    const {
      left: targetLeft,
      width: targetWidth,
      height: targetHeight,
      top: targetTop
    } = targetBounds;
    const targetLeftCenter = targetLeft + targetWidth / 2 - ARROW_WIDTH / 2;
    const targetTopCenter = targetTop + targetHeight / 2 - ARROW_HEIGHT / 2;

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
      animationDuration
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
      <styled.Arrow
        $active={isPlaying}
        $animationDuration={animationDuration}
        style={
          isPlaying
            ? this.getArrowTargetStyles(characterBounds, targetBounds)
            : this.getArrowStyles(characterBounds)
        }
      ></styled.Arrow>
    );
  }
}
