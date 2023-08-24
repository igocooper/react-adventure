import type { ApplySkillProps, Skill } from 'common/types';
import { SKILL, TARGET } from 'common/constants';
import icon from './icons/might.png';
import { put, select, call, fork } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/actions';
import {
  activeTrooperSelector,
  makeCharacterByIdSelector
} from 'modules/battlefield/selectors';
import { getEffectNode } from 'modules/battlefield/effectsNodesMap';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import SFX from 'modules/SFX';
import { applyBuffs } from '../../abilitiesSaga';
import { createMightEffect } from '../../effectsSaga/effects';
import { playEffectedAnimation } from '../../../helpers/playEffectedAnimation';

export const createMightSkill = ({
  percent,
  duration,
  coolDown = 0
}: {
  percent: number;
  duration: number;
  coolDown?: number;
}): Skill => ({
  iconSrc: icon,
  name: SKILL.MIGHT,
  target: TARGET.ALLY,
  coolDown,
  description: `Increase ally damage by ${percent}% for ${duration} rounds.`,
  applySkill: function* ({ targetTrooperId }: ApplySkillProps) {
    const targetTrooper = yield* select(
      makeCharacterByIdSelector(targetTrooperId)
    );
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!targetTrooper || !activeTrooper) return;

    const activeTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      activeTrooper.id
    );

    const mightEffect = createMightEffect({
      percent,
      duration
    });

    yield* call(mightEffect.applyEffect, {
      activeTrooper: targetTrooper
    });

    mightEffect.done = true;

    // Visualise active trooper cast and apply buffs
    yield* fork([activeTrooperAnimationInstance!, 'cast'], {
      castSFX: SFX.buff
    });
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

    yield* fork(
      playEffectedAnimation,
      targetTrooper.id,
      '/images/effects/might.png'
    );
  }
});
