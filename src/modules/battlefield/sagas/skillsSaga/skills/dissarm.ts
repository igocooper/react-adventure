import type { ApplySkillProps, Skill } from 'common/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SKILL, TARGET } from 'common/constants';
import icon from './icons/dissarm.png';
import { call, put, select, fork } from 'typed-redux-saga';
import {
  activeTrooperSelector,
  makeCharacterByIdSelector
} from 'modules/battlefield/selectors';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import theme from 'theme/defaultTheme';
import { createDissarmEffect } from '../../effectsSaga/effects';
import { publishDamageEvent } from '../../damageEventsSaga';
import { playMeleeAttackAnimation, calculateDamage } from '../../attackSaga';
import { getPercentOfBaseDamage } from 'modules/battlefield/helpers/getPercentOfBaseDamage';

export const createDissarmSkill = ({
  duration = 2,
  percent,
  coolDown
}: {
  duration?: number;
  percent: number;
  coolDown: number;
}): Skill => ({
  iconSrc: icon,
  name: SKILL.DISSARM,
  attackType: ATTACK_TYPE.MELEE,
  damageType: DAMAGE_TYPE.PHYSICAL,
  target: TARGET.ENEMY,
  coolDown,
  description: `${SKILL.DISSARM}: Deals ${percent} ${DAMAGE_TYPE.PHYSICAL} damage and remove target weapon for ${duration} rounds. CoolDown: ${coolDown} `,
  applySkill: function* ({ targetTrooperId }: ApplySkillProps) {
    const targetTrooper = yield* select(
      makeCharacterByIdSelector(targetTrooperId)
    );
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!targetTrooper || !activeTrooper) return;

    const [minDamage, maxDamage] = getPercentOfBaseDamage(
      activeTrooper.damage,
      percent
    );
    const damage = `${minDamage}-${maxDamage}`;

    const {
      damage: characterDamage,
      isDying,
      hasMissed,
      isCriticalDamage
    } = calculateDamage(targetTrooper, { ...activeTrooper, damage });

    yield* call(playMeleeAttackAnimation, {
      activeTrooperId: activeTrooper.id,
      selectedTrooperInfo: {
        id: targetTrooper.id,
        team: targetTrooper.team
      },
      damage: characterDamage,
      damageType: activeTrooper.damageType,
      isDying,
      hasMissed,
      isCriticalDamage
    });

    if (!isDying && !hasMissed) {
      const dissarmedEffect = createDissarmEffect({
        duration
      });

      yield* call(dissarmedEffect.applyEffect, {
        targetTrooperId: targetTrooper.id
      });

      dissarmedEffect.done = true;

      yield* fork(publishDamageEvent, {
        id: targetTrooper.id,
        value: 'Dissarmed',
        color: theme.colors.light
      });

      yield* put(
        addEffect({
          id: targetTrooper.id,
          team: targetTrooper.team,
          effect: dissarmedEffect
        })
      );
    }
  }
});
