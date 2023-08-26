import React, { useCallback, useRef, useEffect } from 'react';
import {
  Container,
  Viewport,
  Sword,
  Grid,
  Cell,
  DestroyerArmor,
  DestroyerHelmet
} from './styled';
import { getCharacterProps } from '../battlefield/helpers/getCharacterProps';
import { CHARACTER } from '../wardrobe/constants';
import { CHARACTER_IMAGE_SLOT, DAMAGE_TYPE } from '../../common/constants';
import { TROOPER_TEAM } from '../battlefield/constants';
import {
  CharacterAnimation,
  OnLoadArgs
} from '../animation/containers/CharacterAnimation';
import { register } from '../animation/troopersAnimationInstances';
import {
  registerTrooperNode,
  getTrooperNode
} from '../battlefield/troopersNodesMap';
import { useDispatch, useSelector } from 'store/hooks';
import { updateCharacterImages } from '../../common/helpers';
import {
  moveHero as moveHeroAction,
  setLocationBounds as setLocationBoundsAction,
  setViewportBounds as setViewportBoundsAction
} from '../explore/actions';
import { HERO_ID } from './constants';
import {
  cameraViewPositionXSelector,
  heroDirectionSelector,
  heroIsRunningSelector,
  heroPositionSelector
} from './selectors';
import { MovableObject } from './components/MovableObject';
import { Location } from './containers/Location';
import PF from 'pathfinding';

export const Explore = () => {
  const characterRef = useRef<CharacterAnimation>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isRunning = useSelector(heroIsRunningSelector);
  const cameraViewPositionX = useSelector(cameraViewPositionXSelector);

  useEffect(() => {
    const viewportBounds = viewportRef.current!.getBoundingClientRect();
    const locationBounds = locationRef.current!.getBoundingClientRect();

    dispatch(setLocationBoundsAction(locationBounds));
    dispatch(setViewportBoundsAction(viewportBounds));
  }, []);

  const handleLoad = useCallback(
    ({ id, canvasNode, instance }: OnLoadArgs) => {
      register(id, instance);
      registerTrooperNode(id, canvasNode);
    },
    [dispatch]
  );

  const handleClick = (event: MouseEvent) => {
    if (isRunning) {
      return;
    }

    dispatch(
      moveHeroAction({
        id: HERO_ID,
        position: {
          x: event.clientX,
          y: event.clientY
        }
      })
    );
  };

  const createRow = () => new Array(30).fill(0).map((_, index) => index);
  const grid = [
    createRow(),
    createRow(),
    createRow(),
    createRow(),
    createRow(),
    createRow(),
  ];

  const PFGrid = new PF.Grid(30, 6);
  const finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });

  const CELL_SIZE = 100;
  return (
    <Container>
      <Viewport ref={viewportRef} onClick={handleClick}>
        <Location ref={locationRef} positionX={cameraViewPositionX}>
          <Grid>
            {grid.map((row, rowIndex) => {
              return (
                <>
                  {row.map((cell, cellIndex) => {
                    const position = {
                      x: cellIndex * CELL_SIZE,
                      y: rowIndex * CELL_SIZE
                    };

                    return (
                      <Cell
                        onClick={() => {
                          console.log(
                            `row: ${rowIndex}, cell: ${cellIndex}. Path [${rowIndex}, ${cellIndex}]`
                          );

                          const path = finder.findPath(
                            3,
                            1,
                            rowIndex,
                            cellIndex,
                            PFGrid
                          );

                          console.log(`path: ${path}`);
                        }}
                        onContextMenu={(event) => {
                          event.preventDefault()
                          const node = event.target;

                          node.style.background = '#000';

                          console.log(`blocked:  [${rowIndex}, ${cellIndex}]`);

                          PFGrid.setWalkableAt(rowIndex, cellIndex, false);
                        }}
                        key={`${rowIndex - cellIndex}`}
                        position={position}
                        width={CELL_SIZE}
                        height={CELL_SIZE}
                      />
                    );
                  })}
                </>
              );
            })}
          </Grid>
          <Items />
          <MovableObject>
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
        </Location>
      </Viewport>
    </Container>
  );
};

const Items = () => (
  <>
    <Sword
      onClick={(e) => {
        const url = e.target.src;
        e.target.remove();

        updateCharacterImages(
          [
            {
              url,
              itemSlot: 'Left Hand Weapon.png'
            }
          ],
          HERO_ID
        );
      }}
    />
    <DestroyerArmor
      onClick={(e) => {
        e.target.remove();

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
      }}
    />
    <DestroyerHelmet
      onClick={(e) => {
        e.target.remove();

        updateCharacterImages(
          [
            {
              url: '/images/helmets/Destroyer Helmet.png',
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
      }}
    />
  </>
);
