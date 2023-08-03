import type { Effect } from 'modules/battlefield/types';
import { call } from 'typed-redux-saga';
import { finishTrooperTurn } from 'modules/battlefield/sagas/roundSaga';
import anchorIcon from './icons/anchor.png';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { EFFECT } from 'common/constants';
import { publishDamageEvent } from 'modules/battlefield/sagas/damageEventsSaga';
import { getEffectNode } from '../../../effectsNodesMap';
import theme from 'theme/defaultTheme';

export const createAnchorEffect = ({
  duration
}: {
  duration: number;
}): Effect => {
  return {
    name: EFFECT.ANCHOR,
    description: `${EFFECT.ANCHOR} effect. Skips target turn.`,
    duration,
    once: true,
    done: false,
    applyEffect: function* ({ activeTrooper }) {
      return function* () {
        yield* call(publishDamageEvent, {
          id: activeTrooper.id,
          value: 'Skipped',
          color: theme.colors.black,
          delay: 900
        });

        const anchorAnimation = yield* call(
          getAreaEffectAnimationInstance,
          EFFECT.ANCHOR
        );

        yield* call(anchorAnimation!.play);

        yield* call(finishTrooperTurn);
      };
    },
    cancelEffect: function* ({ activeTrooper }) {
      const effectNode = getEffectNode(activeTrooper.id);

      effectNode!.classList.remove(EFFECT.ANCHOR);
    },
    iconSrc: anchorIcon
  };
};
