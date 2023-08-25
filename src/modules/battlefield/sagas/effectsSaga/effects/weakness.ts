import type { Effect } from 'modules/battlefield/types';
import {
  calculatePercentage,
  displayDuration,
  generateId
} from 'common/helpers';
import { put, select } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/reducers/troopsSlice';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';
import weakness from './icons/weakness.png';
import { EFFECT, EFFECT_TYPE } from 'common/constants';

export const createWeaknessEffect = ({
  percent,
  duration
}: {
  percent: number;
  duration: number;
}): Effect => {
  return {
    id: generateId(),
    name: EFFECT.WEAKNESS,
    type: EFFECT_TYPE.CURSE,
    description: `"${EFFECT.WEAKNESS}" effect. Decrease target health ${percent} times.`,
    stackInfo: (duration) =>
      `Decrease health by <curse>${percent}%</curse>. (Duration: ${displayDuration(
        duration
      )})`,
    duration,
    once: true,
    done: false,
    applyEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;

      const health =
        activeTrooper.health -
        calculatePercentage(activeTrooper.baseHealth!, percent);
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
    cancelEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;

      const health =
        activeTrooper.health +
        calculatePercentage(activeTrooper.baseHealth!, percent);

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
