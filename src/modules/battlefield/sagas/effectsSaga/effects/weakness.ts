import type { ApplyEffectProps, Effect } from 'modules/battlefield/types';
import { put } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/reducers/troopsSlice';
import weakness from './icons/weakness.png';

export const createWeaknessEffect = ({
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
      const health = Math.floor(activeTrooper.health / multiplier);
      const currentHealth =
        activeTrooper.currentHealth > health
          ? health
          : activeTrooper.currentHealth;

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates: {
            currentHealth,
            health
          },
          team: activeTrooper.team
        })
      );
    },
    cancelEffect: function* ({ activeTrooper }: ApplyEffectProps) {
      const health = Math.floor(activeTrooper.health * multiplier);

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates: {
            health
          },
          team: activeTrooper.team
        })
      );
    },
    iconSrc: weakness
  };
};
