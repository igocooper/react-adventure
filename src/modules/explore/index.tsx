import React, { useCallback, useRef, useEffect } from 'react';
import PF from 'pathfinding';
import {
  Container,
  Viewport,
  Sword,
  DestroyerArmor,
  DestroyerHelmet
} from './styled';
import { getCharacterProps } from '../battlefield/helpers/getCharacterProps';
import {
  CharacterAnimation,
  OnLoadArgs
} from '../animation/containers/CharacterAnimation';
import { register } from '../animation/troopersAnimationInstances';
import { registerTrooperNode } from '../battlefield/troopersNodesMap';
import { useDispatch, useSelector } from 'store/hooks';
import {
  equipHelmet,
  updateCharacterImages,
  equipArmor,
  equipRightHandWeapon
} from 'common/helpers';
import {
  moveCameraView as moveCameraViewAction,
  moveCharacterToGridCell as moveCharacterToGridCellAction,
  objectClicked,
  setLocationBounds as setLocationBoundsAction,
  setViewportBounds as setViewportBoundsAction
} from '../explore/actions';
import { HERO_ID, NPC_ID } from './constants';
import {
  cameraViewPositionXSelector,
  gridSelector,
  makeCharacterGridPositionSelector,
  makeCharacterIsRunningSelector,
  pathFinderSelector
} from './selectors';
import { MovableObject } from './components/MovableObject';
import { NPC } from './styled';
import { Location } from './containers/Location';
import { MapGrid } from './containers/MapGrid';
import { getGridPositionFromNode } from './helpers/getGridPositionFromNode';
import SFX from 'modules/SFX';
import {
  mountainMage,
  priest1,
  waterMage,
  paladin,
  darkPaladin,
  hero
} from 'factory/characters';
import { destroyerArmor, destroyerHelmet } from 'factory/armors';
import { meatCutter } from 'factory/weapons';

export const Explore = () => {
  const characterRef = useRef<CharacterAnimation>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const cameraViewPositionX = useSelector(cameraViewPositionXSelector);
  const PFGrid = useSelector(gridSelector);

  useEffect(() => {
    const viewportBounds = viewportRef.current!.getBoundingClientRect();
    const locationBounds = locationRef.current!.getBoundingClientRect();

    // TODO: remove this mock we do this to lock Priest initial location
    if (PFGrid) {
      PFGrid.setWalkableAt(1, 4, false);
    }

    dispatch(setLocationBoundsAction(locationBounds));
    dispatch(setViewportBoundsAction(viewportBounds));
  }, [PFGrid]);

  const handleLoad = useCallback(
    ({ id, canvasNode, instance }: OnLoadArgs) => {
      register(id, instance);
      registerTrooperNode(id, canvasNode);
    },
    []
  );

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
    <Container>
      <Viewport ref={viewportRef}>
        <Location ref={locationRef} positionX={cameraViewPositionX}>
          <MapGrid onTileClick={handleClick}>
            <Items />
            <MovableObject id={NPC_ID}>
              <NPC
                data-grid-position="1, 4"
                onClick={(event) => {
                  const node = event.target;
                  const [row, column] = getGridPositionFromNode(
                    node as HTMLElement
                  );

                  dispatch(
                    objectClicked({
                      id: HERO_ID,
                      gridPosition: [row!, column!]
                    })
                  );
                }}
              >
                <CharacterAnimation
                  {...getCharacterProps({
                    type: 'priest-1',
                    equipment: priest1({}).equipment,
                    appearance: priest1({}).appearance
                  })}
                  id={NPC_ID}
                  onLoad={handleLoad}
                />
              </NPC>
            </MovableObject>
            <MovableObject id={3}>
              <NPC>
                <CharacterAnimation
                  {...getCharacterProps({
                    type: 'water-mage',
                    equipment: waterMage({}).equipment,
                    appearance: waterMage({}).appearance
                  })}
                  id={3}
                  onLoad={handleLoad}
                />
              </NPC>
            </MovableObject>
            <MovableObject id={4}>
              <NPC>
                <CharacterAnimation
                  {...getCharacterProps({
                    type: 'mountain-mage',
                    equipment: mountainMage({}).equipment,
                    appearance: mountainMage({}).appearance
                  })}
                  id={4}
                  onLoad={handleLoad}
                />
              </NPC>
            </MovableObject>
            <MovableObject id={5}>
              <NPC>
                <CharacterAnimation
                  {...getCharacterProps({
                    type: 'paladin',
                    equipment: paladin({}).equipment,
                    appearance: paladin({}).appearance
                  })}
                  id={5}
                  onLoad={handleLoad}
                />
              </NPC>
            </MovableObject>
            <MovableObject id={6}>
              <NPC>
                <CharacterAnimation
                  {...getCharacterProps({
                    type: 'dark-paladin',
                    equipment: darkPaladin({}).equipment,
                    appearance: darkPaladin({}).appearance
                  })}
                  id={6}
                  onLoad={handleLoad}
                />
              </NPC>
            </MovableObject>
            <MovableObject id={HERO_ID}>
              <CharacterAnimation
                ref={characterRef}
                {...getCharacterProps({
                  type: 'hero',
                  equipment: hero({}).equipment,
                  appearance: hero({}).appearance
                })}
                id={HERO_ID}
                onLoad={handleLoad}
              />
            </MovableObject>
          </MapGrid>
        </Location>
      </Viewport>
    </Container>
  );
};

const Items = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Sword
        data-grid-position="2, 10"
        onClick={(event) => {
          const node: HTMLElement = event.target;
          const [row, column] = getGridPositionFromNode(node as HTMLElement);

          dispatch(
            objectClicked({
              id: HERO_ID,
              gridPosition: [row!, column!],
              cb: () => {
                node.remove();

                const characterImagesToUpdate = equipRightHandWeapon({
                  weapon: meatCutter
                });

                void SFX.equip.play();

                void updateCharacterImages(HERO_ID, characterImagesToUpdate);
              }
            })
          );
        }}
      />
      <DestroyerArmor
        data-grid-position="3, 15"
        onClick={(event) => {
          const node: HTMLElement = event.target;
          const [row, column] = getGridPositionFromNode(node as HTMLElement);

          dispatch(
            objectClicked({
              id: HERO_ID,
              gridPosition: [row!, column!],
              cb: () => {
                node.remove();

                const characterImagesToUpdate = equipArmor({
                  armor: destroyerArmor
                });

                void SFX.equip.play();

                void updateCharacterImages(HERO_ID, characterImagesToUpdate);
              }
            })
          );
        }}
      />
      <DestroyerHelmet
        data-grid-position="4, 16"
        onClick={(event) => {
          const node: HTMLElement = event.target;
          const [row, column] = getGridPositionFromNode(node as HTMLElement);

          dispatch(
            objectClicked({
              id: HERO_ID,
              gridPosition: [row!, column!],
              cb: () => {
                node.remove();

                const characterImagesToUpdate = equipHelmet({
                  helmet: destroyerHelmet,
                  characterAppearance: hero({}).appearance!,
                });

                void SFX.equip.play();

                void updateCharacterImages(HERO_ID, characterImagesToUpdate);
              }
            })
          );
        }}
      />
    </>
  );
};
