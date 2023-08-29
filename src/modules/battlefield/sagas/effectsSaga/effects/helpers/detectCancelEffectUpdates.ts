import type { Trooper } from 'modules/battlefield/types';
import type { Effect } from 'common/types';
import { omit } from 'common/helpers';
export const detectCancelEffectUpdates = (
  effectId: Effect['id'],
  trooper: Trooper
) => {
  // first we remove all effects to get default state in reversed order they were applied
  const defaultTrooperState = trooper.effects.reduceRight(
    (updatedTrooper, effect) => {
      if (effect.getRevertTrooperUpdates) {
        return {
          ...updatedTrooper,
          ...effect.getRevertTrooperUpdates(updatedTrooper)
        };
      } else {
        return updatedTrooper;
      }
    },
    trooper
  );

  const effectsLeft = trooper.effects.filter(
    (effect) => effect.getTrooperUpdates && effect.id !== effectId
  );

  // now apply all changes from effects which left except the one we cancelled in order they were originally applied
  const trooperState = effectsLeft.reduce(
    (updatedTrooper, effect) => {
      if (effect.getTrooperUpdates) {
        return {
          ...updatedTrooper,
          ...effect.getTrooperUpdates(updatedTrooper)
        };
      } else {
        return updatedTrooper;
      }
    },
    {
      ...defaultTrooperState,
      // we need to filter out effect which is canceled to detect updates of the one that left
      effects: effectsLeft
    }
  );

  // now we need to filter those properties which could be updated by effect to prevent mutating others
  return omit(trooperState, ['effects', 'id', 'position', 'skills', 'team']);
};
