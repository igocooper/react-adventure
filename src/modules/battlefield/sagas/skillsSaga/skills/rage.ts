import type { Skill } from 'common/types';
import { SKILL, TARGET } from 'common/constants';
import { wait } from 'common/helpers';
import icon from './icons/rage.png';
import { fork, call, put, select } from 'typed-redux-saga';
import { activeTrooperSelector } from 'modules/battlefield/selectors';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { getEffectNode } from 'modules/battlefield/effectsNodesMap';
import { createMightEffect } from '../../effectsSaga/effects';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import SFX from 'modules/SFX';

export const RAGE_EFFECT_DURATION = 1200;
export const createRageSkill = ({
  duration = 2,
  coolDown
}: {
  duration?: number;
  coolDown: number;
}): Skill => ({
  iconSrc: icon,
  name: SKILL.RAGE,
  target: TARGET.SELF,
  coolDown,
  description: `${SKILL.RAGE}: Increase trooper attack. Duration ${duration} rounds. CoolDown: ${coolDown}`,
  applySkill: function* () {
    const activeTrooper = yield* select(activeTrooperSelector);

    if (!activeTrooper) return;

    const mightEffect = createMightEffect({
      duration,
      percent: 20
    });

    const effectNode = getEffectNode(activeTrooper.id);
    const rageAnimation = yield* call(
      getAreaEffectAnimationInstance,
      SKILL.RAGE
    );

    yield* fork(rageAnimation!.play);
    void SFX.rage.play();
    // yield* call(wait, 200);
    effectNode!.classList.add(SKILL.RAGE.toLowerCase());
    yield* call(wait, RAGE_EFFECT_DURATION);

    yield* put(
      addEffect({
        id: activeTrooper.id,
        team: activeTrooper.team,
        effect: mightEffect
      })
    );
  }
});
