import React, { useCallback, useRef, useEffect } from 'react';
import {
  Container,
  Viewport,
  Sword,
  DestroyerArmor,
  DestroyerHelmet
} from './styled';
import { getCharacterProps } from '../battlefield/helpers/getCharacterProps';
import { CHARACTER } from '../wardrobe/constants';
import { CHARACTER_IMAGE_SLOT } from '../../common/constants';
import {
  CharacterAnimation,
  OnLoadArgs
} from '../animation/containers/CharacterAnimation';
import { register } from '../animation/troopersAnimationInstances';
import { registerTrooperNode } from '../battlefield/troopersNodesMap';
import { useDispatch, useSelector } from 'store/hooks';
import { updateCharacterImages } from '../../common/helpers';
import {
  moveCameraView,
  moveCharacterThroughPath as moveCharacterThroughPathAction,
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
import { priest1 } from '../../factory/characters';
import { getGridPositionFromNode } from './helpers/getGridPositionFromNode';

export const Explore = () => {
  const characterRef = useRef<CharacterAnimation>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isRunning = useSelector(makeCharacterIsRunningSelector(HERO_ID));
  const cameraViewPositionX = useSelector(cameraViewPositionXSelector);
  const heroGridPosition = useSelector(
    makeCharacterGridPositionSelector(HERO_ID)
  );
  const PFGrid = useSelector(gridSelector);

  useEffect(() => {
    const viewportBounds = viewportRef.current!.getBoundingClientRect();
    const locationBounds = locationRef.current!.getBoundingClientRect();

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
    [dispatch]
  );

  const handleClick = (event: MouseEvent, path: Array<[number, number]>) => {
    if (isRunning) {
      return;
    }

    dispatch(moveCameraView(event));
    dispatch(
      moveCharacterThroughPathAction({
        id: HERO_ID,
        path
      })
    );

    // dispatch(
    //   moveCharacterThroughPathAction({
    //     id: NPC_ID,
    //     path: [
    //       [1, 5],
    //       [1, 6],
    //       [1, 7],
    //       [1, 8]
    //     ]
    //   })
    // );
  };

  return (
    <Container>
      <Viewport ref={viewportRef}>
        <Location ref={locationRef} positionX={cameraViewPositionX}>
          <MapGrid
            heroGridPosition={heroGridPosition}
            onTileClick={handleClick}
          >
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
            <MovableObject id={HERO_ID}>
              <CharacterAnimation
                ref={characterRef}
                {...getCharacterProps({
                  type: CHARACTER.type,
                  equipment: {},
                  appearance: CHARACTER.appearance
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
          const node = event.target;
          const [row, column] = getGridPositionFromNode(node as HTMLElement);

          dispatch(
            objectClicked({
              id: HERO_ID,
              gridPosition: [row!, column!],
              cb: () => {
                const url = node.src;
                node.remove();

                updateCharacterImages(
                  [
                    {
                      url,
                      itemSlot: 'Left Hand Weapon.png'
                    }
                  ],
                  HERO_ID
                );
              }
            })
          );
        }}
      />
      <DestroyerArmor
        data-grid-position="3, 15"
        onClick={(event) => {
          const node = event.target;
          const [row, column] = getGridPositionFromNode(node as HTMLElement);

          dispatch(
            objectClicked({
              id: HERO_ID,
              gridPosition: [row!, column!],
              cb: () => {
                node.remove();

                updateCharacterImages(
                  [
                    {
                      url: '/images/armors/destroyer/Body.png',
                      itemSlot: 'Body.png'
                    },
                    {
                      url: '/images/armors/destroyer/Right Arm.png',
                      itemSlot: 'Right Arm.png'
                    },
                    {
                      url: '/images/armors/destroyer/Right Hand.png',
                      itemSlot: 'Right Hand.png'
                    },
                    {
                      url: '/images/armors/destroyer/Right Leg.png',
                      itemSlot: 'Right Leg.png'
                    },
                    {
                      url: '/images/armors/destroyer/Left Arm.png',
                      itemSlot: 'Left Arm.png'
                    },
                    {
                      url: '/images/armors/destroyer/Left Hand.png',
                      itemSlot: 'Left Hand.png'
                    },
                    {
                      url: '/images/armors/destroyer/Left Leg.png',
                      itemSlot: 'Left Leg.png'
                    }
                  ],
                  HERO_ID
                );
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

                updateCharacterImages(
                  [
                    {
                      url: '/images/helmets/600/Destroyer Helmet.png',
                      itemSlot: 'Head Armor High.png'
                    },
                    { url: '', itemSlot: CHARACTER_IMAGE_SLOT.FACE_01 },
                    { url: '', itemSlot: CHARACTER_IMAGE_SLOT.FACE_02 },
                    { url: '', itemSlot: CHARACTER_IMAGE_SLOT.FACE_03 },
                    { url: '', itemSlot: CHARACTER_IMAGE_SLOT.HEAD },
                    { url: '', itemSlot: CHARACTER_IMAGE_SLOT.HEAD_HAIR },
                    { url: '', itemSlot: CHARACTER_IMAGE_SLOT.HEAD_BEARD }
                  ],
                  HERO_ID
                );
              }
            })
          );
        }}
      />
    </>
  );
};
