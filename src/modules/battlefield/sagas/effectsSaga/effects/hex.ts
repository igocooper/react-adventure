import { type ApplyEffectProps, type Effect } from 'modules/battlefield/types';
import { put } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/reducers/troopsSlice';

export const createHexEffect = ({
  multiplier,
  duration
}: {
  multiplier: number;
  duration: number;
}): Effect => {
  return {
    name: 'might',
    duration,
    once: true,
    done: false,
    applyEffect: function* ({ activeTrooper }: ApplyEffectProps) {
      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates: {
            currentHealth: activeTrooper.currentHealth / multiplier
          },
          team: activeTrooper.team
        })
      );
    },
    cancelEffect: function* ({ activeTrooper }: ApplyEffectProps) {
      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates: {
            currentHealth: activeTrooper.currentHealth * multiplier
          },
          team: activeTrooper.team
        })
      );
    }
  };
};
