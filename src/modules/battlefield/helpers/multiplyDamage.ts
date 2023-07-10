import { getDamage } from 'common/helpers';

export const multiplyDamage = (damage: string, multiplier: number) => {
  const [minDamage, maxDamage] = getDamage(damage);

  return `${Math.round(minDamage * multiplier)}-${Math.round(
    maxDamage * multiplier
  )}`;
};
