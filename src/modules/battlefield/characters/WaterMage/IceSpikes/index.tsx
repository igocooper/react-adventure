import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
import { IceSpike } from './IceSpike';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { wait } from 'common/helpers';
import type { Coordinates } from 'modules/battlefield/types';
import { ATTACK_ID_ICE_SPIKES } from '../constants';

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
      x: coordinate.x - FRAME_WIDTH / 2,
      y: coordinate.y - FRAME_HEIGHT / 2
    };
  });

export class IceSpikes extends Component<Props, State> {
  // ts-ignore
  spikesRefs: Array<React.RefObject<any>>;

  constructor(props: Props) {
    super(props);

    this.state = {
      coordinates: []
    };
    this.spikesRefs = [];
  }

  componentDidMount() {
    registerAreaEffect(ATTACK_ID_ICE_SPIKES, this);
  }

  async play(coordinates: Coordinates | undefined) {
    if (!coordinates) return;

    this.spikesRefs = coordinates.map(() => createRef());

    this.setState({
      coordinates: prepareCoordinates(coordinates)
    });

    // We need it so state would be updated and spikes rendered when we play animation
    await wait(100);

    const spikeAnimationPromises = this.spikesRefs.map((spikeRef) => {
      return spikeRef.current.play();
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
          <IceSpike
            key={`${index}-${spikeCoords.x}-${spikeCoords.y}`}
            position={spikeCoords}
            ref={this.spikesRefs[index]}
          />
        );
      }),
      containerNode
    );
  }
}
