import React from 'react';
import type { Trooper } from 'modules/battlefield/types';
import {
  useCursesAndBuffs,
  useStackedEffects
} from 'modules/battlefield/hooks';
import { StackedEffectsIcons } from './components/StackedEffectsIcons/index.';

type Props = Pick<Trooper, 'effects'>;

export const Effects = ({ effects }: Props) => {
  if (!effects || effects.length === 0) {
    return null;
  }

  const { curses, buffs } = useCursesAndBuffs(effects);
  const stackedCurses = useStackedEffects(curses);
  const stackedBuffs = useStackedEffects(buffs);

  return (
    <>
      {buffs.length !== 0 && (
        <StackedEffectsIcons title="Buffs:" stackedEffects={stackedBuffs} />
      )}
      {curses.length !== 0 && (
        <StackedEffectsIcons title="Curses:" stackedEffects={stackedCurses} />
      )}
    </>
  );
};
