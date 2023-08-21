import type { ApplySkillProps, Skill } from 'common/types';
import { CHARACTER_IMAGE_SLOT, SKILL, TARGET } from 'common/constants';
import icon from './icons/heal.png';
import { put, select, call, fork } from 'typed-redux-saga';
import { applyHeal } from 'modules/battlefield/actions';
import { activeTrooperSelector } from 'modules/battlefield/selectors';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { updateCharacterImages } from 'common/helpers';
import { publishDamageEvent } from 'modules/battlefield/sagas/damageEventsSaga';
import theme from 'theme/defaultTheme';
import { applyBuffs } from '../../abilitiesSaga';
import SFX from 'modules/SFX';

export const createHealSkill = (): Skill => ({
  iconSrc: icon,
  name: SKILL.HEAL,
  target: TARGET.ALLY,
  coolDown: 0,
  description: `${SKILL.HEAL}: heals ally trooper hit points based on trooper healPower.`,
  applySkill: function* ({ targetTrooper }: ApplySkillProps) {
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!activeTrooper) return;
    let heal = activeTrooper.healPower || 1;

    const reachedMaxHP =
      heal + targetTrooper.currentHealth > targetTrooper.health;

    if (reachedMaxHP) {
      heal = targetTrooper.health - targetTrooper.currentHealth;
    }

    const targetTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      targetTrooper.id
    );
    const activeTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      activeTrooper.id
    );

    yield* call(
      updateCharacterImages,
      [
        {
          url: '/images/effects/heal.png',
          itemSlot: CHARACTER_IMAGE_SLOT.EFFECT
        }
      ],
      targetTrooper.id
    );

    yield* fork([activeTrooperAnimationInstance!, 'cast'], {
      castSFX: SFX.heal
    });

    yield* call(publishDamageEvent, {
      id: targetTrooper.id,
      value: `+${heal}`,
      color: theme.colors.heal,
      delay: 400
    });

    yield* put(
      applyHeal({
        id: targetTrooper.id,
        team: targetTrooper.team,
        heal
      })
    );

    yield* call([targetTrooperAnimationInstance!, 'effected']);

    yield* call(applyBuffs, { id: targetTrooper.id });
  }
});
