import type { ApplySkillProps, Skill } from 'common/types';
import {
  ATTACK_TYPE,
  DAMAGE_TYPE,
  EFFECT,
  SKILL,
  TARGET
} from 'common/constants';
import icon from './icons/hemorrhage.png';
import { call, put, select, fork } from 'typed-redux-saga';
import { activeTrooperSelector } from 'modules/battlefield/selectors';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import theme from 'theme/defaultTheme';
import { createBleedingEffect } from '../../effectsSaga/effects';
import { publishDamageEvent } from '../../damageEventsSaga';
import { playMeleeAttackAnimation, calculateDamage } from '../../attackSaga';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';

export const createHemorrhageSkill = ({
  duration = 2,
  damage,
  coolDown
}: {
  duration?: number;
  damage: number;
  coolDown: number;
}): Skill => ({
  iconSrc: icon,
  name: SKILL.HEMORRHAGE_HACK,
  attackType: ATTACK_TYPE.MELEE,
  damageType: DAMAGE_TYPE.PHYSICAL,
  target: TARGET.ENEMY,
  coolDown,
  description: `${SKILL.HEMORRHAGE_HACK}: Open enemy vein during attack. Inflicting ${damage} blood damage at the
   beginning of its' turn. Duration ${duration} rounds. CoolDown: ${coolDown} `,
  applySkill: function* ({ targetTrooper }: ApplySkillProps) {
    const activeTrooper = yield* select(activeTrooperSelector);

    if (!activeTrooper) return;

    const {
      damage: characterDamage,
      isDying,
      hasMissed,
      isCriticalDamage
    } = calculateDamage(targetTrooper, activeTrooper);

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
      const bleedEffect = createBleedingEffect({
        damage,
        duration
      });

      yield* fork(publishDamageEvent, {
        id: targetTrooper.id,
        value: 'Bleeding',
        color: theme.colors.blood,
        delay: 900
      });

      const bleedingAnimation = yield* call(
        getAreaEffectAnimationInstance,
        EFFECT.BLEEDING
      );

      yield* call(bleedingAnimation!.play);

      yield* put(
        addEffect({
          id: targetTrooper.id,
          team: targetTrooper.team,
          effect: bleedEffect
        })
      );
    }
  }
});
