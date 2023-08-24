import type { Effect } from 'modules/battlefield/types';
import { call, select } from 'typed-redux-saga';
import { finishTrooperTurn } from 'modules/battlefield/sagas/roundSaga';
import anchorIcon from './icons/anchor.png';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { EFFECT, EFFECT_TYPE } from 'common/constants';
import { publishDamageEvent } from 'modules/battlefield/sagas/damageEventsSaga';
import { getEffectNode } from '../../../effectsNodesMap';
import theme from 'theme/defaultTheme';
import SFX from 'modules/SFX';
import { generateId } from 'common/helpers';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';

export const createAnchorEffect = ({
  duration
}: {
  duration: number;
}): Effect => {
  return {
    id: generateId(),
    name: EFFECT.ANCHOR,
    type: EFFECT_TYPE.CURSE,
    description: `${EFFECT.ANCHOR} effect. Skips target turn.`,
    duration,
    once: true,
    done: false,
    stacks: false,
    applyEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;

      return function* () {
        void SFX.skipTurn.play();
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
    cancelEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;

      const effectNode = getEffectNode(activeTrooper.id);

      effectNode!.classList.remove(EFFECT.ANCHOR);
    },
    iconSrc: anchorIcon
  };
};
