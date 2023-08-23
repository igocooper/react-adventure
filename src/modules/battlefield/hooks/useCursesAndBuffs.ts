import type { Effect } from 'common/types';
import { EFFECT_TYPE } from 'common/constants';

export const useCursesAndBuffs = (effects: Effect[]) => {
  return effects.reduce(
    (result, effect) => {
      if (effect.type === EFFECT_TYPE.CURSE) {
        result.curses.push(effect);
      }

      if (effect.type === EFFECT_TYPE.BUFF) {
        result.buffs.push(effect);
      }

      return result;
    },
    {
      curses: [] as Effect[],
      buffs: [] as Effect[]
    }
  );
};
