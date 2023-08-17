import React, { useCallback, useState, useRef } from 'react';
import { Container, Location, Hero } from './styled';
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
import { useKeyPress } from 'common/hooks/useKeyPress';
import { wait } from 'common/helpers/wait';

type Position = {
  x: number;
  y: number;
};

const STEP_X = 200;
const STEP_Y = 50;
const SPEED_X = 800;
const SPEED_Y = 400;
const SPEED_BASE = .6;

export const Demo = () => {
  const location = useLocation();
  const characterRef = useRef<CharacterAnimation>(null);
  const dispatch = useDispatch();
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 400
  });
  const [forwardDirection, setDirection] = useState(true);
  const timeRef = useRef(1000);

  const handleLoad = useCallback(
    ({ id, canvasNode, instance }: OnLoadArgs) => {
      register(id, instance);
      registerTrooperNode(id, canvasNode);
    },
    [dispatch]
  );

  const handleClick = async (event) => {
    if (!characterRef.current) return;
    characterRef.current.run();

    const heroNode = getTrooperNode(CHARACTER.id);

    const {
      x: currentHeroX,
      y: currentHeroY,
      width,
      height
    } = heroNode!.getBoundingClientRect();

    if (currentHeroX > event.clientX) {
      setDirection(false);
    } else {
      setDirection(true);
    }

    const x = event.clientX - width / 2;
    const y = event.clientY - height / 2;

    const distance = Math.floor(
      Math.sqrt(
        Math.pow(Math.abs(currentHeroX - x), 2) +
          Math.pow(Math.abs(currentHeroY - y), 2)
      )
    );

    timeRef.current = distance / SPEED_BASE;

    console.log('time', timeRef.current);
    console.log('distance', distance);
    console.log('speed', SPEED_BASE);

    setPosition(() => ({
      y,
      x
    }));

    await wait(timeRef.current);
    void characterRef.current.idle();
  };

  const onMoveRight = async () => {
    if (!characterRef.current) return;
    characterRef.current.run();
    setPosition((state) => ({
      y: state.y,
      x: state.x + STEP_X
    }));
    setDirection(true);
    await wait(SPEED_X);
    void characterRef.current.idle();
  };

  const onMoveLeft = async () => {
    if (!characterRef.current) return;
    characterRef.current.run();
    setPosition((state) => ({
      y: state.y,
      x: state.x - STEP_X
    }));
    setDirection(false);
    await wait(SPEED_X);
    void characterRef.current.idle();
  };

  const onMoveUp = async () => {
    if (!characterRef.current) return;
    characterRef.current.run();
    setPosition((state) => ({
      y: state.y - STEP_Y,
      x: state.x
    }));
    await wait(SPEED_Y);
    void characterRef.current.idle();
  };

  const onMoveDown = async () => {
    if (!characterRef.current) return;
    characterRef.current.run();
    setPosition((state) => ({
      y: state.y + STEP_Y,
      x: state.x
    }));
    await wait(SPEED_Y);
    void characterRef.current.idle();
  };

  useKeyPress('ArrowRight', onMoveRight);
  useKeyPress('ArrowLeft', onMoveLeft);
  useKeyPress('ArrowUp', onMoveUp);
  useKeyPress('ArrowDown', onMoveDown);

  return (
    <Container>
      <Location $location={location} onClick={handleClick}>
        <Hero
          $forwardDirection={forwardDirection}
          // $speedX={SPEED_X}
          // $speedY={SPEED_Y}
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
    </Container>
  );
};
