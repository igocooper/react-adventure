import { getDamage } from 'common/helpers';

export const substractDamage = (
  damage: string,
  damageToExtract: [number, number]
) => {
  const [minDamage, maxDamage] = getDamage(damage);
  const [min, max] = damageToExtract;

  return `${Math.round(minDamage - min)}-${Math.round(maxDamage - max)}`;
};
