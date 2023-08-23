import { getDamage } from 'common/helpers';

export const addDamage = (damage: string, damageToAdd: [number, number]) => {
  const [minDamage, maxDamage] = getDamage(damage);
  const [min, max] = damageToAdd;

  return `${Math.round(minDamage + min)}-${Math.round(maxDamage + max)}`;
};
