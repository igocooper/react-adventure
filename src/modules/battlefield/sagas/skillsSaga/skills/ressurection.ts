import type { ApplySkillProps, Skill } from 'common/types';
import { SKILL, TARGET } from 'common/constants';
import icon from './icons/resurrection.png';
import { put, select, call, fork } from 'typed-redux-saga';
import { applyHeal } from 'modules/battlefield/actions';
import { activeTrooperSelector } from 'modules/battlefield/selectors';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { calculatePercentage, wait } from 'common/helpers';
import { ANIMATION_SPEED } from 'modules/battlefield/containers/AnimationAreaContainer/Resurrection';
import { playEffectedAnimation } from 'modules/battlefield/helpers/playEffectedAnimation';
import SFX from 'modules/SFX';

export const createResurrectionSkill = ({
  coolDown = 5,
  percent = 10
}: { percent?: number; coolDown?: number } = {}): Skill => ({
  iconSrc: icon,
  name: SKILL.RESURRECTION,
  target: TARGET.ALLY_DEAD,
  coolDown,
  description: `${SKILL.RESURRECTION}: revive fallen trooper with ${percent}% of HP. Cooldown: ${coolDown}`,
  applySkill: function* ({ targetTrooper }: ApplySkillProps) {
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!activeTrooper) return;

    const targetTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      targetTrooper.id
    );

    // visualise applying effect animation
    void SFX.holyRevive.play();
    yield* call(
      playEffectedAnimation,
      activeTrooper.id,
      '/images/effects/holy.png'
    );

    const resurrectionAnimation = getAreaEffectAnimationInstance(
      SKILL.RESURRECTION
    );
    yield* fork([resurrectionAnimation!, 'play']);

    // I want this effect to be applied while ray animation still present
    yield* call(wait, ANIMATION_SPEED - 500);
    yield* call(
      playEffectedAnimation,
      targetTrooper.id,
      '/images/effects/holy.png'
    );
    yield* fork([targetTrooperAnimationInstance!, 'idle']);

    yield* put(
      applyHeal({
        id: targetTrooper.id,
        team: targetTrooper.team,
        heal: calculatePercentage(targetTrooper.health, percent)
      })
    );
    void SFX.healed.play();
    yield* call(
      playEffectedAnimation,
      targetTrooper.id,
      '/images/effects/heal.png'
    );
  }
});
