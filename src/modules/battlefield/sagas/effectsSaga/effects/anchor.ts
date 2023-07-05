import type { Effect } from 'modules/battlefield/types';
import { call } from 'typed-redux-saga';
import { finishTrooperTurn } from 'modules/battlefield/sagas/roundSaga';
import anchorIcon from './icons/anchor.png';

export const createAnchorEffect = ({
  duration
}: {
  duration: number;
}): Effect => {
  return {
    name: 'might',
    duration,
    once: true,
    done: false,
    applyEffect: function* () {
      return function* () {
        yield* call(finishTrooperTurn);
      };
    },
    iconSrc: anchorIcon
  };
};
