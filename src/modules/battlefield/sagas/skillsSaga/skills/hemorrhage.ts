import type { Skill, ApplySkillProps } from 'common/types';
import { SKILL } from 'common/constants';
import icon from './icons/hemorrhage.png';

export const createHemorrhageAbility = ({
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
  coolDown: coolDown,
  description: `${SKILL.HEMORRHAGE_HACK}: Poison an enemy during attack. Inflicting ${damage} poison damage at the
   beginning of its' turn. Duration ${duration} rounds. CoolDown: ${coolDown} `,
  applySkill: function* ({ targetTrooper }: ApplySkillProps) {
    console.log('Applying Skill', targetTrooper);
  }
});
