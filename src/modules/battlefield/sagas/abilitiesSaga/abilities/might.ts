import type { Ability, ApplyAbilityProps } from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { createMightEffect } from '../../effectsSaga/effects';
import { getEffectNode } from '../../../effectsNodesMap';
import { updateCharacterImages } from '../../../../../common/helpers';
import { itemSlots } from '../../../../../common/constants';
import { getTrooperAnimationInstance } from '../../../../animation/troopersAnimationInstances';

export const createMightAbility = ({
  duration,
  multiplier
}: {
  duration: number;
  multiplier: number;
}): Ability => ({
  name: 'might',
  applyAbility: function* ({ targetTrooper }: ApplyAbilityProps) {
    const trooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      targetTrooper.id
    );

    const mightEffect = createMightEffect({
      multiplier,
      duration
    });

    yield* call(mightEffect.applyEffect, {
      activeTrooper: targetTrooper
    });

    mightEffect.done = true;

    const effectNode = getEffectNode(targetTrooper.id);

    effectNode!.style.transition = 'transform 500ms linear';
    effectNode!.style.transform = 'scale(1.15)';

    yield* call(
      updateCharacterImages,
      [{ url: '/images/effects/holy.png', itemSlot: itemSlots.EFFECT }],
      targetTrooper.id
    );

    yield* call([trooperAnimationInstance!, 'effected']);

    yield* put(
      addEffect({
        id: targetTrooper.id,
        team: targetTrooper.team,
        effect: mightEffect
      })
    );
  }
});
