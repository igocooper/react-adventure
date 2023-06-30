import { getDamage } from './getDamage';

export const divideDamage = (damage: string, divider: number) => {
  const [minDamage, maxDamage] = getDamage(damage);

  return `${Math.round(minDamage / divider)}-${Math.round(
    maxDamage / divider
  )}`;
};
