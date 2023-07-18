import type { Ability, ApplyAbilityProps } from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { createPoisonEffect } from '../../effectsSaga/effects';
import { getRandomNumberInRange } from 'common/helpers';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { EFFECT, ABILITY_TYPE, ABILITY } from 'common/constants';
import poisonIcon from './icons/poison.png';

export const createPoisonAbility = ({
  duration,
  damage,
  hitChance
}: {
  duration: number;
  damage: number;
  hitChance: number;
}): Ability => ({
  iconSrc: poisonIcon,
  type: ABILITY_TYPE.CURSE,
  name: ABILITY.POISON,
  hitChance,
  applyAbility: function* ({ targetTrooper }: ApplyAbilityProps) {
    const roll = getRandomNumberInRange(1, 100);

    if (roll <= hitChance) {
      const poisonEffect = createPoisonEffect({
        damage,
        duration
      });

      const poisonAnimation = yield* call(
        getAreaEffectAnimationInstance,
        EFFECT.POISON
      );

      yield* call(poisonAnimation!.play);

      yield* put(
        addEffect({
          id: targetTrooper.id,
          team: targetTrooper.team,
          effect: poisonEffect
        })
      );
    }
  }
});
