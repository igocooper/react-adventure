import { getDamage, calculatePercentage } from 'common/helpers';

export const getPercentOfBaseDamage = (
  baseWeaponDamage: string,
  percent: number
): [number, number] => {
  const [minDamage, maxDamage] = getDamage(baseWeaponDamage);

  return [
    calculatePercentage(minDamage, percent),
    calculatePercentage(maxDamage, percent)
  ];
};
