import type { Ability, ApplyAbilityProps } from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { applyDamage } from 'modules/battlefield/reducers/troopsSlice';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { ABILITY_TYPE, ABILITY, DAMAGE_TYPE } from 'common/constants';
import icon from './icons/lightningStrike.png';
import { wait, getRandomNumberInRange } from 'common/helpers';
import SFX from 'modules/SFX';

export const createLightningStrikeAbility = ({
  damage,
  hitChance
}: {
  damage: number;
  hitChance: number;
}): Ability => ({
  iconSrc: icon,
  type: ABILITY_TYPE.CURSE,
  name: ABILITY.LIGHTNING_STRIKE,
  description: `Has ${hitChance}% chance to strike with an enemy with Lightning during attack. (${damage} ${DAMAGE_TYPE.LIGHT} damage)`,
  hitChance,
  applyAbility: function* ({ targetTrooper }: ApplyAbilityProps) {
    const roll = getRandomNumberInRange(1, 100);

    if (roll <= hitChance) {
      const lightningStrikeAnimation = yield* call(
        getAreaEffectAnimationInstance,
        ABILITY.LIGHTNING_STRIKE
      );

      void SFX.lightningStrike.play();

      yield* call(wait, 700);

      yield* put(
        applyDamage({
          team: targetTrooper.team,
          id: targetTrooper.id,
          damage,
          damageType: DAMAGE_TYPE.LIGHT
        })
      );

      yield* call(lightningStrikeAnimation!.play);
    }
  }
});
