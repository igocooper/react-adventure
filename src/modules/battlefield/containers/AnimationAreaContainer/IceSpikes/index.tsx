import React, { Component, createRef } from 'react';
import { IceSpike } from './IceSpike';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { wait } from 'common/helpers';
import type { Coordinates } from 'modules/battlefield/types';

type State = {
  coordinates: Coordinates;
};

const FRAME_WIDTH = 185;
const FRAME_HEIGHT = 146;

const prepareCoordinates = (coordinates: Coordinates) =>
  coordinates.map((coordinate) => {
    return {
      ...coordinate,
      x: coordinate.x - FRAME_WIDTH / 2,
      y: coordinate.y - FRAME_HEIGHT / 2
    };
  });

export class IceSpikes extends Component<undefined, State> {
  // ts-ignore
  spikesRefs: Array<React.RefObject<any>>;

  constructor(props: undefined) {
    super(props);

    this.state = {
      coordinates: []
    };
    this.spikesRefs = [];
  }

  componentDidMount() {
    registerAreaEffect('ice-spikes', this);
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

    return coordinates.map((spikeCoords, index) => {
      return (
        <IceSpike
          key={`${index}-${spikeCoords.x}-${spikeCoords.y}`}
          position={spikeCoords}
          ref={this.spikesRefs[index]}
        />
      );
    });
  }
}
