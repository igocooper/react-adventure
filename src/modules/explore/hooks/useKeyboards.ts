import { wait } from 'common/helpers';
import { useKeyPress } from 'common/hooks/useKeyPress';
import { useRef, useState } from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';

type Position = {
  x: number;
  y: number;
};

const STEP_X = 200;
const STEP_Y = 50;
const SPEED_X = 800;
const SPEED_Y = 400;

const useKeyboards = () => {
  const characterRef = useRef<CharacterAnimation>(null);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 400
  });
  const [bgPositionX, setBgPositionX] = useState(0);
  const [forwardDirection, setDirection] = useState(true);
  const timeRef = useRef(1000);
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
};
