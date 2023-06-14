import React, { useEffect } from 'react';
import { Battlefield } from '../components/Battlefield';
import { useSelector, useDispatchAction } from 'store/hooks';
import { startRound as startRoundAction } from '../actions';
import {
  attackersSelector,
  cursorSelector,
  defendersSelector
} from '../selectors';

export const BattleFieldContainer = () => {
  const attackers = useSelector(attackersSelector);
  const defenders = useSelector(defendersSelector);
  const cursor = useSelector(cursorSelector);
  const startRound = useDispatchAction(startRoundAction);

  useEffect(() => {
    startRound(1);
  }, []);

  return (
    <Battlefield attackers={attackers} defenders={defenders} cursor={cursor} />
  );
};
