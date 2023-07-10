export const getDamage = (damage: string): [number, number] => {
  const [minDamge, maxDamage] = damage.split('-');

  if (!minDamge || !maxDamage) {
    return [0, 0];
  }
  return [parseInt(minDamge, 10), parseInt(maxDamage, 10)];
};
