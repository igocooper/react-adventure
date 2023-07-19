import type { Ability, ApplyAbilityProps } from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { createHealEffect } from '../../effectsSaga/effects';
import { getRandomNumberInRange } from 'common/helpers';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { ABILITY, ABILITY_TYPE, EFFECT } from 'common/constants';
import icon from './icons/heal.png';

export const createHealAbility = ({
  duration,
  heal,
  hitChance
}: {
  duration: number;
  heal: number;
  hitChance: number;
}): Ability => ({
  iconSrc: icon,
  type: ABILITY_TYPE.BUFF,
  name: ABILITY.HEAL,
  description: `Has a ${hitChance}% chance to apply "${EFFECT.HEAL}" effect. Healing target trooper for ${heal} HP right before its' turn starts for ${duration} rounds.`,
  hitChance,
  applyAbility: function* ({ targetTrooper }: ApplyAbilityProps) {
    const roll = getRandomNumberInRange(1, 100);

    if (roll <= hitChance) {
      const healEffect = createHealEffect({
        heal,
        duration
      });

      const healAnimation = yield* call(
        getAreaEffectAnimationInstance,
        EFFECT.HEAL
      );

      yield* call(healAnimation!.play);

      yield* put(
        addEffect({
          id: targetTrooper.id,
          team: targetTrooper.team,
          effect: healEffect
        })
      );
    }
  }
});
