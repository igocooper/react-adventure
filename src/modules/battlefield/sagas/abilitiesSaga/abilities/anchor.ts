import type { Ability, ApplyAbilityProps } from 'modules/battlefield/types';
import { call, put, select } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { getEffectNode } from 'modules/battlefield/effectsNodesMap';
import { publishDamageEvent } from 'modules/battlefield/sagas/damageEventsSaga';
import { createAnchorEffect } from '../../effectsSaga/effects';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';
import { ABILITY_TYPE, ABILITY } from 'common/constants';
import theme from 'theme/defaultTheme';
import icon from './icons/anchor.png';
import { getRandomNumberInRange, wait } from 'common/helpers';
import SFX from 'modules/SFX';

export const ANCHOR_EFFECT_DURATION = 1200;
export const createAnchorAbility = ({
  duration,
  hitChance
}: {
  duration: number;
  hitChance?: number;
}): Ability => ({
  iconSrc: icon,
  type: ABILITY_TYPE.CURSE,
  name: ABILITY.ANCHOR,
  hitChance: hitChance || 100,
  description: `${
    hitChance ? `Has a ${hitChance}% chance to apply` : 'Applies'
  } "${
    ABILITY.ANCHOR
  }" effect. Forcing target to skip his turn for ${duration} rounds.`,
  applyAbility: function* ({ targetTrooperId }: ApplyAbilityProps) {
    const targetTrooper = yield* select(
      makeCharacterByIdSelector(targetTrooperId)
    );
    if (!targetTrooper) return;

    const roll = getRandomNumberInRange(1, 100);

    if (roll <= (hitChance || 100)) {
      const anchorEffect = createAnchorEffect({
        duration
      });

      const effectNode = getEffectNode(targetTrooper.id);

      yield* call(publishDamageEvent, {
        id: targetTrooper.id,
        value: 'Anchored',
        color: theme.colors.black,
        delay: 400
      });
      void SFX.anchor.play();
      effectNode!.classList.add(ABILITY.ANCHOR.toLowerCase());
      yield* call(wait, ANCHOR_EFFECT_DURATION);

      yield* put(
        addEffect({
          id: targetTrooper.id,
          team: targetTrooper.team,
          effect: anchorEffect
        })
      );
    }
  }
});
