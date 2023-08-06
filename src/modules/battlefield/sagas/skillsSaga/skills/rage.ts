import type { Skill } from 'common/types';
import { ATTACK_TYPE, SKILL, TARGET } from 'common/constants';
import icon from './icons/rage.png';
import { put, select } from 'typed-redux-saga';
import { activeTrooperSelector } from 'modules/battlefield/selectors';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { createMightEffect } from '../../effectsSaga/effects';

export const createRageSkill = ({
  duration = 2,
  coolDown
}: {
  duration?: number;
  coolDown: number;
}): Skill => ({
  iconSrc: icon,
  name: SKILL.RAGE,
  attackType: ATTACK_TYPE.MELEE,
  target: TARGET.SELF,
  coolDown: coolDown,
  description: `${SKILL.RAGE}: Increase attack, but decrease evade and defence. Duration ${duration} rounds. CoolDown: ${coolDown}`,
  applySkill: function* () {
    const activeTrooper = yield* select(activeTrooperSelector);

    if (!activeTrooper) return;

    const mightEffect = createMightEffect({
      duration,
      multiplier: 1.2
    });

    yield* put(
      addEffect({
        id: activeTrooper.id,
        team: activeTrooper.team,
        effect: mightEffect
      })
    );
  }
});
