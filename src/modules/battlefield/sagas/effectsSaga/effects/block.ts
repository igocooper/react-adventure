import type { Effect, Trooper } from 'modules/battlefield/types';
import { put } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/actions';
import blockIcon from './icons/block.png';
import { EFFECT, EFFECT_TYPE } from 'common/constants';
import { generateId } from 'common/helpers';

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
    applyEffect: function* ({ activeTrooper }: { activeTrooper: Trooper }) {
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
    cancelEffect: function* ({ activeTrooper }: { activeTrooper: Trooper }) {
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
