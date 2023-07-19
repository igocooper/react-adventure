import type { Effect, Trooper } from 'modules/battlefield/types';
import { put } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/actions';
import blockIcon from './icons/block.png';
import { EFFECT } from 'common/constants';

export const createBlockEffect = (): Effect => {
  return {
    name: EFFECT.BLOCK,
    description: `"${EFFECT.ANCHOR}" effect. Increase defence.`,
    duration: 0,
    once: true,
    done: false,
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
