import React, { useEffect } from 'react';
import { Battlefield } from '../components/Battlefield';
import { useSelector, useDispatchAction } from 'store/hooks';
import { startRound as startRoundAction } from '../actions';
import {
  attackersSelector,
  cursorSelector,
  defendersSelector,
  activeTrooperSelector,
  hoveredElementSelector
} from '../selectors';

export const BattleFieldContainer = () => {
  const attackers = useSelector(attackersSelector);
  const defenders = useSelector(defendersSelector);
  const cursor = useSelector(cursorSelector);
  const startRound = useDispatchAction(startRoundAction);
  const activeTrooper = useSelector(activeTrooperSelector);
  const hoveredElement = useSelector(hoveredElementSelector);

  useEffect(() => {
    startRound(1);
  }, []);

  return (
    <Battlefield
      attackers={attackers}
      defenders={defenders}
      cursor={cursor}
      activeTrooper={activeTrooper!}
      hoveredTrooperId={hoveredElement?.id}
    />
  );
};
