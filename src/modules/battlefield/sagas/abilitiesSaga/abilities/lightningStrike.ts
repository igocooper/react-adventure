import type { Ability, ApplyAbilityProps } from 'modules/battlefield/types';
import { call, fork, put, select } from 'typed-redux-saga';
import { applyDamage } from 'modules/battlefield/reducers/troopsSlice';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { ABILITY_TYPE, ABILITY, DAMAGE_TYPE } from 'common/constants';
import icon from './icons/lightningStrike.png';
import {
  activeTrooperSelector,
  makeCharacterByIdSelector
} from 'modules/battlefield/selectors';
import { wait, getRandomNumberInRange } from 'common/helpers';
import SFX from 'modules/SFX';
import { applyDefenceAndResistance } from 'common/helpers/applyDefenceAndResistance';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';

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
  applyAbility: function* ({ targetTrooperId }: ApplyAbilityProps) {
    const targetTrooper = yield* select(
      makeCharacterByIdSelector(targetTrooperId)
    );
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!targetTrooper || !activeTrooper) return;

    const roll = getRandomNumberInRange(1, 100);

    if (roll <= hitChance) {
      const targetTrooperAnimationInstance = yield* call(
        getTrooperAnimationInstance,
        targetTrooper.id
      );
      const lightningStrikeAnimation = yield* call(
        getAreaEffectAnimationInstance,
        ABILITY.LIGHTNING_STRIKE
      );

      void SFX.lightningStrike.play();

      yield* call(wait, 700);

      const isDying = damage >= targetTrooper.currentHealth;

      yield* put(
        applyDamage({
          team: targetTrooper.team,
          id: targetTrooper.id,
          damage: applyDefenceAndResistance(
            damage,
            DAMAGE_TYPE.LIGHT,
            activeTrooper
          ),
          damageType: DAMAGE_TYPE.LIGHT
        })
      );

      yield* call(lightningStrikeAnimation!.play);

      if (isDying) {
        yield* fork([targetTrooperAnimationInstance!, 'die']);
      }
    }
  }
});
