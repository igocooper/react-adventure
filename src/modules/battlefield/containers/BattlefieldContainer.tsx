import React from 'react';
import { Battlefield } from '../components/Battlefield';
import { useSelector } from 'store/hooks';
import { attackersSelector, defendersSelector } from '../selectors';

export const BattleFieldContainer = () => {
  // TODO: figure out why selectors do not return correct type
  // const props = useStructuredSelector({
  //   attackers: attackersSelector,
  //   defenders: defendersSelector,
  // });
  const attackers = useSelector(attackersSelector);
  const defenders = useSelector(defendersSelector);

  return <Battlefield attackers={attackers} defenders={defenders} />;
};
