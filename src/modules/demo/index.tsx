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
const BG_SCROLL_STEP = 500;

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
    },
    [dispatch]
  );

  const handleClick = async (event) => {
    const { width: viewportWidth } =
      viewportRef.current!.getBoundingClientRect();
    const { width: locationWidth } =
      locationRef.current!.getBoundingClientRect();
    const heroNode = getTrooperNode(CHARACTER.id);
    const heroBounds = heroNode!.getBoundingClientRect();

    const maxBgPosition = 0;
    const minBgPosition = viewportWidth - locationWidth;
    const leftScrollArea = viewportWidth / 3;
    const rightScrollArea = (viewportWidth / 3) * 2;

    const x = event.clientX - heroBounds.width / 2;
    const y = event.clientY - heroBounds.height / 2;

    // check X instead of heroBounds.x to turn hero and disable back tracking
    if (heroBounds.x + heroBounds.width / 2 > event.clientX) {
      setDirection(false);
    } else {
      setDirection(true);
    }

    if (!characterRef.current) return;
    characterRef.current.run();

    if (event.clientX >= rightScrollArea) {
      setBgPositionX((state) =>
        Math.max(state - BG_SCROLL_STEP, minBgPosition)
      );
    }

    if (event.clientX <= leftScrollArea) {
      setBgPositionX((state) =>
        Math.min(state + BG_SCROLL_STEP, maxBgPosition)
      );
    }

    // hypotenuse a^2 + b^2 = c^2
    const distance = Math.floor(
      Math.sqrt(
        Math.pow(Math.abs(heroBounds.x - x), 2) +
          Math.pow(Math.abs(heroBounds.y - y), 2)
      )
    );

    timeRef.current = distance / SPEED_BASE;
    scrollTimeRef.current = BG_SCROLL_STEP / SPEED_BASE;

    setPosition(() => ({
      y,
      x: x - bgPositionX
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
        >
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
        </Location>
        <Border style={{ zIndex: 1 }} />
        <Border style={{ right: 0, left: 'initial' }} />
      </Viewport>
    </Container>
  );
};
