import React, { useCallback } from 'react';
import { getCharacterProps } from '../battlefield/helpers/getCharacterProps';
import {
  CharacterAnimation,
  OnLoadArgs
} from '../animation/containers/CharacterAnimation';
import { register } from '../animation/troopersAnimationInstances';
import { registerTrooperNode } from '../battlefield/troopersNodesMap';
import { useDispatch } from 'store/hooks';
import {
  moveCameraView as moveCameraViewAction,
  moveCharacterToGridCell as moveCharacterToGridCellAction
} from '../explore/actions';
import { HERO_ID } from './constants';
import { MovableObject } from './components/MovableObject';
import { Location } from './containers/Location';
import { hero } from 'factory/characters';

export const Explore = () => {
  const dispatch = useDispatch();

  const handleLoad = useCallback(({ id, canvasNode, instance }: OnLoadArgs) => {
    register(id, instance);
    registerTrooperNode(id, canvasNode);
  }, []);

  const handleClick = useCallback(
    (event: MouseEvent, gridCell: number[]) => {
      // TODO: do not scroll when hero is running
      dispatch(moveCameraViewAction(event));
      dispatch(
        moveCharacterToGridCellAction({
          id: HERO_ID,
          gridCell
        })
      );
    },
    [moveCameraViewAction, moveCharacterToGridCellAction, dispatch]
  );

  return (
    <Location onGridTileClick={handleClick}>
      <MovableObject id={HERO_ID}>
        <CharacterAnimation
          {...getCharacterProps({
            type: 'hero',
            equipment: hero({}).equipment,
            appearance: hero({}).appearance
          })}
          id={HERO_ID}
          onLoad={handleLoad}
        />
      </MovableObject>
    </Location>
  );
};
