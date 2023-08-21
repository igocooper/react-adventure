import type { Ability, ApplyAbilityProps } from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { createPoisonEffect } from '../../effectsSaga/effects';
import { getRandomNumberInRange } from 'common/helpers';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { EFFECT, ABILITY_TYPE, ABILITY } from 'common/constants';
import poisonIcon from './icons/poison.png';
import { publishDamageEvent } from '../../damageEventsSaga';
import theme from 'theme/defaultTheme';
import SFX from 'modules/SFX';

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
  description: `Has ${hitChance}% chance to poison an enemy during attack. Inflicting ${damage} poison damage at the
   beginning of its' turn for ${duration} rounds.`,
  hitChance,
  applyAbility: function* ({ targetTrooper }: ApplyAbilityProps) {
    const roll = getRandomNumberInRange(1, 100);

    if (roll <= hitChance) {
      const poisonEffect = createPoisonEffect({
        damage,
        duration
      });

      yield* call(publishDamageEvent, {
        id: targetTrooper.id,
        value: 'Poisoned',
        color: theme.colors.poison,
        delay: 900
      });

      const poisonAnimation = yield* call(
        getAreaEffectAnimationInstance,
        EFFECT.POISON
      );

      void SFX.poison.play();
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
