import type { Ability, ApplyAbilityProps } from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { createPoisonEffect } from '../../effectsSaga/effects';
import { getRandomNumberInRange } from 'common/helpers';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { EFFECT } from 'modules/battlefield/constants';

export const createPoisonAbility = ({
  duration,
  damage,
  hitChance
}: {
  duration: number;
  damage: number;
  hitChance: number;
}): Ability => ({
  name: 'poison',
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
