import type { ApplySkillProps, Skill } from 'common/types';
import { CHARACTER_IMAGE_SLOT, SKILL, TARGET } from 'common/constants';
import icon from './icons/divineShield.png';
import { put, select, call, fork } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/actions';
import { activeTrooperSelector } from 'modules/battlefield/selectors';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { updateCharacterImages, wait } from 'common/helpers';
import { applyBuffs } from '../../abilitiesSaga';
import SFX from 'modules/SFX';
import { createDivineShieldEffect } from '../../effectsSaga/effects/divineShield';
import { getEffectNode } from 'modules/battlefield/effectsNodesMap';

export const DIVINE_SHIELD_EFFECT_DURATION = 800;
export const createDivineShieldSkill = (
  { duration = 3, coolDown = 8 }: { duration?: number; coolDown?: number } = {
    duration: 1,
    coolDown: 8
  }
): Skill => ({
  iconSrc: icon,
  name: SKILL.DIVINE_SHIELD,
  target: TARGET.ALLY,
  coolDown,
  description: `${SKILL.DIVINE_SHIELD}: protects with a holy shield which absorb all damage for ${duration} rounds. Cooldown: ${coolDown}`,
  applySkill: function* ({ targetTrooper }: ApplySkillProps) {
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!activeTrooper) return;

    const targetTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      targetTrooper.id
    );

    // create effect
    const divineShieldEffect = createDivineShieldEffect({
      duration
    });

    // instantly apply effect
    yield* call(divineShieldEffect.applyEffect, {
      activeTrooper: targetTrooper
    });
    divineShieldEffect.done = true;

    // visualise applying effect animation
    SFX.holyShield.play();

    // update target trooper effect image
    yield* call(
      updateCharacterImages,
      [
        {
          url: '/images/effects/holy.png',
          itemSlot: CHARACTER_IMAGE_SLOT.EFFECT
        }
      ],
      targetTrooper.id
    );
    yield* fork([targetTrooperAnimationInstance!, 'effected']);
    const effectNode = getEffectNode(targetTrooper.id);
    effectNode!.classList.add('divine-shield');

    yield* call(wait, DIVINE_SHIELD_EFFECT_DURATION);

    // add effect to trooper
    yield* put(
      addEffect({
        id: targetTrooper.id,
        team: targetTrooper.team,
        effect: divineShieldEffect
      })
    );

    // apply passive buffs if trooper has some
    yield* call(applyBuffs, { id: targetTrooper.id });
  }
});
