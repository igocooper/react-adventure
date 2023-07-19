import type { AttackType, DamageType } from 'common/types';
import { ATTACK_TYPE, DAMAGE_TYPE } from 'common/constants';
import { getDamageTypeIcon } from './getDamageTypeIcon';

export const getAttackTypeIcon = (
  attackType: AttackType,
  damageType: DamageType
) => {
  switch (attackType) {
    case ATTACK_TYPE.RANGE:
      if (damageType === DAMAGE_TYPE.PHYSICAL) {
        return '🏹';
      }
      return `🪄:${getDamageTypeIcon(damageType)}`;
    case ATTACK_TYPE.SPLASH:
      return `💥:${getDamageTypeIcon(damageType)}`;
    case ATTACK_TYPE.MELEE:
      return '🗡';
    default:
      return '👊🏼';
  }
};
