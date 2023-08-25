import type { Effect } from 'modules/battlefield/types';
import { put, select } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/actions';
import blockIcon from './icons/block.png';
import { EFFECT, EFFECT_TYPE } from 'common/constants';
import { generateId } from 'common/helpers';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';

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
    applyEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          team: activeTrooper.team,
          updates: {
            defence: activeTrooper.defence + 50
          }
        })
      );
    },
    cancelEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;
      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          team: activeTrooper.team,
          updates: {
            defence: activeTrooper.defence - 50
          }
        })
      );
    },
    iconSrc: blockIcon
  };
};
