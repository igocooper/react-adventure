import type { Effect, Trooper } from 'modules/battlefield/types';
import { put, select } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/actions';
import blockIcon from './icons/block.png';
import { EFFECT, EFFECT_TYPE } from 'common/constants';
import { generateId } from 'common/helpers';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';
import { detectCancelEffectUpdates } from './helpers/detectCancelEffectUpdates';

const getTrooperUpdates = (trooper: Trooper) => ({
  defence: trooper.defence + 50
});

const getRevertTrooperUpdates = (trooper: Trooper) => ({
  defence: trooper.defence - 50
});

export const createBlockEffect = (): Effect => {
  return {
    id: generateId(),
    name: EFFECT.BLOCK,
    type: EFFECT_TYPE.BUFF,
    description: `"${EFFECT.ANCHOR}" effect. Increase defence.`,
    duration: 0,
    once: true,
    done: false,
    stacks: false,
    iconSrc: blockIcon,
    applyEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;

      const updates = getTrooperUpdates(activeTrooper);

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          team: activeTrooper.team,
          updates
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
          team: activeTrooper.team,
          updates
        })
      );
    },
    getTrooperUpdates,
    getRevertTrooperUpdates
  };
};
