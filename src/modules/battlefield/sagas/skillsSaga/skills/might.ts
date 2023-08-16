import type { ApplySkillProps, Skill } from 'common/types';
import { SKILL, TARGET } from 'common/constants';
import icon from './icons/might.png';
import { put, select, call, fork } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/actions';
import { activeTrooperSelector } from 'modules/battlefield/selectors';
import { getEffectNode } from 'modules/battlefield/effectsNodesMap';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { applyBuffs } from '../../abilitiesSaga';
import { createMightEffect } from '../../effectsSaga/effects';

export const createMightSkill = ({
  multiplier,
  duration,
  coolDown = 0
}: {
  multiplier: number;
  duration: number;
  coolDown?: number;
}): Skill => ({
  iconSrc: icon,
  name: SKILL.MIGHT,
  target: TARGET.ALLY,
  coolDown,
  description: `Increase ally damage ${multiplier} times for ${duration} rounds.`,
  applySkill: function* ({ targetTrooper }: ApplySkillProps) {
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!activeTrooper) return;

    const activeTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      activeTrooper.id
    );

    const targetTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      targetTrooper.id
    );

    const mightEffect = createMightEffect({
      multiplier,
      duration
    });

    // WE DO NOT WANT EFFECT TO STUCK UP
    if (
      !targetTrooper.effects.find((effect) => effect.name === mightEffect.name)
    ) {
      yield* call(mightEffect.applyEffect, {
        activeTrooper: targetTrooper
      });

      mightEffect.done = true;
    }

    // Visualise active trooper cast and apply buffs
    yield* fork([activeTrooperAnimationInstance!, 'cast']);
    yield* call(applyBuffs, { id: targetTrooper.id });

    // Visualise enlarge effect
    const effectNode = getEffectNode(targetTrooper.id);

    effectNode!.style.transition = 'transform 500ms linear';
    effectNode!.style.transform = 'scale(1.15)';

    yield* put(
      addEffect({
        id: targetTrooper.id,
        team: targetTrooper.team,
        effect: mightEffect
      })
    );

    yield* call([targetTrooperAnimationInstance!, 'effected']);
  }
});
