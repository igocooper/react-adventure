import type { Ability, ApplyAbilityProps } from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { createMightEffect } from '../../effectsSaga/effects';
import { getEffectNode } from '../../../effectsNodesMap';
import { updateCharacterImages } from 'common/helpers';
import { ABILITY, ABILITY_TYPE, CHARACTER_IMAGE_SLOT } from 'common/constants';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import icon from './icons/might.png';

export const createMightAbility = ({
  duration,
  multiplier
}: {
  duration: number;
  multiplier: number;
}): Ability => ({
  iconSrc: icon,
  description: `Increase ally damage ${multiplier} times for ${duration} rounds.`,
  type: ABILITY_TYPE.BUFF,
  name: ABILITY.MIGHT,
  applyAbility: function* ({ targetTrooper }: ApplyAbilityProps) {
    const trooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      targetTrooper.id
    );

    const mightEffect = createMightEffect({
      multiplier,
      duration
    });

    // WE DO NOT WANT EFFECT TO STUCK UP
    if (
      !targetTrooper.effects.find((effect) => effect.name === mightEffect.name)
    ) {
      yield* call(mightEffect.applyEffect, {
        activeTrooper: targetTrooper
      });
    }

    mightEffect.done = true;

    const effectNode = getEffectNode(targetTrooper.id);

    effectNode!.style.transition = 'transform 500ms linear';
    effectNode!.style.transform = 'scale(1.15)';

    yield* call(
      updateCharacterImages,
      [
        {
          url: '/images/effects/might.png',
          itemSlot: CHARACTER_IMAGE_SLOT.EFFECT
        }
      ],
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
