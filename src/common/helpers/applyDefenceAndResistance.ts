import type { Trooper } from 'modules/battlefield/types';
import { DAMAGE_TYPE } from '../constants';

export const applyDefenceAndResistance = (
  damage: number,
  damageType: string,
  selectedTrooper: Trooper
) => {
  const { fireResistance, poisonResistance, waterResistance, defence } =
    selectedTrooper;

  if (damageType === DAMAGE_TYPE.PHYSICAL && defence) {
    return damage - Math.floor((damage / 100) * defence);
  }

  if (damageType === DAMAGE_TYPE.WATER && waterResistance) {
    return damage - Math.floor((damage / 100) * waterResistance);
  }

  if (damageType === DAMAGE_TYPE.FIRE && fireResistance) {
    return damage - Math.floor((damage / 100) * fireResistance);
  }

  if (damageType === DAMAGE_TYPE.POISON && poisonResistance) {
    return damage - Math.floor((damage / 100) * poisonResistance);
  }

  return damage;
};
