import React, { Component, createRef } from 'react';
import { MagmaGeyser } from './MagmaGeyser';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { wait } from 'common/helpers';
import type { Coordinates } from 'modules/battlefield/types';

type State = {
  coordinates: Coordinates;
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

export class MagmaGeysers extends Component<unknown, State> {
  // ts-ignore
  itemsRefs: Array<React.RefObject<any>>;

  constructor(props: undefined) {
    super(props);

    this.state = {
      coordinates: []
    };
    this.itemsRefs = [];
  }

  componentDidMount() {
    registerAreaEffect('magma-geysers', this);
  }

  async play(coordinates: Coordinates | undefined) {
    if (!coordinates) return;

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

    return coordinates.map((spikeCoords, index) => {
      return (
        <MagmaGeyser
          key={`${index}-${spikeCoords.x}-${spikeCoords.y}`}
          position={spikeCoords}
          ref={this.itemsRefs[index]}
        />
      );
    });
  }
}
