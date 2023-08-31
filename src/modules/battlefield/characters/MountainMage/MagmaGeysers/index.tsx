import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
import { MagmaGeyser } from './MagmaGeyser';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { wait } from 'common/helpers';
import type { Coordinates } from 'modules/battlefield/types';
import { ATTACK_ID_LAVA_GEYSER } from '../constants';

type State = {
  coordinates: Coordinates;
};

type Props = {
  containerNode: HTMLElement;
};

const FRAME_WIDTH = 256;
const FRAME_HEIGHT = 256;

const prepareCoordinates = (coordinates: Coordinates) =>
  coordinates.map((coordinate) => {
    return {
      ...coordinate,
      x: coordinate.x - FRAME_WIDTH / 1.25,
      y: coordinate.y - FRAME_HEIGHT / 1.25
    };
  });

export class MagmaGeysers extends Component<Props, State> {
  // ts-ignore
  itemsRefs: Array<React.RefObject<any>>;

  constructor(props: Props) {
    super(props);

    this.state = {
      coordinates: []
    };
    this.itemsRefs = [];
  }

  componentDidMount() {
    registerAreaEffect(ATTACK_ID_LAVA_GEYSER, this);
  }

  async play(coordinates: number | Coordinates | undefined) {
    if (!coordinates || typeof coordinates === 'number') return;

    this.itemsRefs = coordinates.map(() => createRef());

    this.setState({
      coordinates: prepareCoordinates(coordinates)
    });

    // We need it so state would be updated and spikes rendered when we play animation
    await wait(100);

    const spikeAnimationPromises = this.itemsRefs.map((itemRef) => {
      return itemRef.current.play();
    });

    await Promise.all(spikeAnimationPromises);
  }

  render() {
    const { coordinates } = this.state;
    const { containerNode } = this.props;

    if (!containerNode) return null;

    return createPortal(
      coordinates.map((spikeCoords, index) => {
        return (
          <MagmaGeyser
            key={`${index}-${spikeCoords.x}-${spikeCoords.y}`}
            position={spikeCoords}
            ref={this.itemsRefs[index]}
          />
        );
      }),
      containerNode
    );
  }
}
