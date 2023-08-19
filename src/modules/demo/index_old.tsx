import React, { useCallback, useState, useRef } from 'react';
import {
  Container,
  Location,
  Hero,
  Viewport,
  Border,
  Foreground
} from './styled';
import { useLocation } from 'common/hooks/useLocation';
import { getCharacterProps } from '../battlefield/helpers/getCharacterProps';
import { CHARACTER } from '../wardrobe/constants';
import { DAMAGE_TYPE } from '../../common/constants';
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
import { useDispatch } from 'store/hooks';
import { wait } from 'common/helpers/wait';

type Position = {
  x: number;
  y: number;
};

const SPEED_BASE = 0.3;

const findRunLeftY = ({ clientX, clientY, heroBounds, leftScrollArea }) => {
  const {
    width: heroWidth,
    height: heroHeight,
    x: heroX,
    y: heroY
  } = heroBounds;
  const scrollDistanceX = Math.abs(clientX - leftScrollArea);
  const x = leftScrollArea - heroWidth / 2;
  const runDistanceX = Math.abs(x - heroX);
  const wholeDistanceX = scrollDistanceX + runDistanceX;
  const runPercentOfWhole = (runDistanceX / wholeDistanceX) * 100;

  const wholeDistanceY = Math.abs(heroY + heroHeight - clientY);
  const runDistanceY = (runPercentOfWhole / 100) * wholeDistanceY;
  const scrollDistanceY = wholeDistanceY - runDistanceY;

  // console.log('wholeDistanceY', wholeDistanceY);
  // console.log('scrollDistanceY', scrollDistanceY);
  // console.log('runDistanceY', runDistanceY);

  console.log(clientY);
  console.log(clientY + scrollDistanceY);

  return {
    scrollDistanceY,
    y: clientY - heroHeight / 2 + scrollDistanceY
  };
};

export const Demo = () => {
  const location = useLocation();
  const characterRef = useRef<CharacterAnimation>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 400
  });
  const [bgPositionX, setBgPositionX] = useState(0);
  const [forwardDirection, setDirection] = useState(true);
  const timeRef = useRef(1000);
  const scrollTimeRef = useRef(1000);

  const handleLoad = useCallback(
    ({ id, canvasNode, instance }: OnLoadArgs) => {
      register(id, instance);
      registerTrooperNode(id, canvasNode);
      instance.run();
    },
    [dispatch]
  );

  const handleClick = async (event) => {
    const { clientX, clientY } = event;
    const { width: viewportWidth } =
      viewportRef.current?.getBoundingClientRect() || {};

    const isLeftEdge = bgPositionX === 0;
    const isRightEdge = bgPositionX <= viewportWidth - 1470; // 1470 location width
    const leftScrollArea = viewportWidth / 3;
    const rightScrollArea = (viewportWidth / 3) * 2;

    const heroNode = getTrooperNode(CHARACTER.id);

    const heroBounds = heroNode!.getBoundingClientRect();
    const { x: currentHeroX, y: currentHeroY, width, height } = heroBounds;

    const x = clientX - width / 2;
    const y = clientY - height / 2;

    // check X instead of currentHeroX to turn hero and disable back tracking
    if (currentHeroX > clientX) {
      setDirection(false);
    } else {
      setDirection(true);
    }

    if (!characterRef.current) return;
    characterRef.current.run();

    // if (event.clientX <= leftScrollArea) {
    //   if (!isLeftEdge) {
    //     const scrollDistance = Math.abs(clientX - leftScrollArea);
    //     // const runDistance = Math.abs(clientX - leftScrollArea);
    //     const x = leftScrollArea - width / 2;
    //     const y = clientY - height / 2;
    //
    //     const { y: midY, scrollDistanceY } = findRunLeftY({
    //       clientX,
    //       clientY,
    //       leftScrollArea,
    //       heroBounds
    //     });
    //
    //     // hypotenuse a^2 + b^2 = c^2
    //     const runDistance = Math.floor(
    //       Math.sqrt(
    //         Math.pow(Math.abs(currentHeroX - x), 2) +
    //           Math.pow(Math.abs(currentHeroY - midY), 2)
    //       )
    //     );
    //
    //     timeRef.current = runDistance / SPEED_BASE;
    //     scrollTimeRef.current = scrollDistance / SPEED_BASE;
    //
    //     setPosition(() => ({
    //       y: midY,
    //       x
    //     }));
    //     await wait(timeRef.current);
    //
    //     // Time = Distance / Time
    //     timeRef.current = scrollDistanceY / SPEED_BASE;
    //     setPosition((state) => ({
    //       y,
    //       x: state.x
    //     }));
    //     setBgPositionX((state) => state + scrollDistance);
    //
    //     await wait(scrollTimeRef.current);
    //     void characterRef.current.idle();
    //     return;
    //   }
    // }

    // if (event.clientX >= rightScrollArea) {
    //   if (!isRightEdge) {
    //     console.log('scroll right');
    //     setBgPositionX((state) => state - 500);
    //   }
    // }

    const distance = Math.floor(
      Math.sqrt(
        Math.pow(Math.abs(currentHeroX - x), 2) +
          Math.pow(Math.abs(currentHeroY - y), 2)
      )
    );

    timeRef.current = distance / SPEED_BASE;
    scrollTimeRef.current = distance / SPEED_BASE;

    setPosition(() => ({
      y,
      x
    }));

    await wait(timeRef.current);
    void characterRef.current.idle();
  };

  return (
    <Container>
      <Viewport ref={viewportRef} onClick={handleClick}>
        <Location
          ref={locationRef}
          $time={timeRef.current}
          $scrollTime={scrollTimeRef.current}
          $positionX={bgPositionX}
          $location={location}
        />
        <Hero
          $forwardDirection={forwardDirection}
          $time={timeRef.current}
          $position={position}
        >
          <CharacterAnimation
            ref={characterRef}
            {...getCharacterProps({
              type: CHARACTER.type,
              equipment: CHARACTER.equipment,
              appearance: CHARACTER.appearance,
              damageType: DAMAGE_TYPE.PHYSICAL
            })}
            id={CHARACTER.id}
            team={TROOPER_TEAM.ATTACKERS}
            onLoad={handleLoad}
          />
        </Hero>
        <Border style={{ zIndex: 1 }} />
        <Border style={{ right: 0, left: 'initial' }} />
      </Viewport>
    </Container>
  );
};
