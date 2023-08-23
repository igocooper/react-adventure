import type { Effect, EffectName } from 'common/types';

export const useStackedEffects = (effects: Effect[]) => {
  return effects.reduce<{ [K in EffectName]?: Effect | Effect[] }>(
    (res, effect) => {
      if (res[effect.name]) {
        return {
          ...res,
          [effect.name]: [res[effect.name], effect]
        };
      }

      return {
        ...res,
        [effect.name]: effect
      };
    },
    {}
  );
};
