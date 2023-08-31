import type { Effect, Trooper } from 'modules/battlefield/types';
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
import { detectCancelEffectUpdates } from './helpers/detectCancelEffectUpdates';

const createGetRevertTrooperUpdates =
  ({ percent }: { percent: number }) =>
  (trooper: Trooper) => {
    const health =
      trooper.health + calculatePercentage(trooper.baseHealth!, percent);

    return {
      health
    };
  };

const createGetTrooperUpdates =
  ({ percent }: { percent: number }) =>
  (trooper: Trooper) => {
    const health =
      trooper.health - calculatePercentage(trooper.baseHealth!, percent);
    const currentHealth =
      trooper.currentHealth > health ? health : trooper.currentHealth;

    return {
      currentHealth,
      health
    };
  };

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
    description: `"${EFFECT.WEAKNESS}" effect. Decrease target max health by ${percent}%.`,
    stackInfo: (duration) =>
      `Decrease health by <curse>${percent}%</curse>. (Duration: ${displayDuration(
        duration
      )})`,
    duration,
    once: true,
    done: false,
    iconSrc: weakness,
    applyEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;

      const getTrooperModification = createGetTrooperUpdates({ percent });
      const updates = getTrooperModification(activeTrooper);

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates,
          team: activeTrooper.team
        })
      );
    },
    cancelEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;

      const updates = detectCancelEffectUpdates(this.id, activeTrooper);

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates,
          team: activeTrooper.team
        })
      );
    },
    getTrooperUpdates: createGetTrooperUpdates({ percent }),
    getRevertTrooperUpdates: createGetRevertTrooperUpdates({ percent })
  };
};
