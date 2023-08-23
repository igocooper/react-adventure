import type { Trooper } from 'modules/battlefield/types';
import { DAMAGE_TYPE } from '../constants';

export const applyDefenceAndResistance = (
  damage: number,
  damageType: string,
  selectedTrooper: Trooper
) => {
  const { resistance, defence } = selectedTrooper;

  const { fire, poison, water, wind, earth, blood, light, dark } =
    resistance || {};

  if (damageType === DAMAGE_TYPE.PHYSICAL && defence) {
    if (defence > 100) {
      return 0;
    }

    return damage - Math.floor((damage / 100) * defence);
  }

  if (damageType === DAMAGE_TYPE.WATER && water) {
    if (water > 100) {
      return 0;
    }

    return damage - Math.floor((damage / 100) * water);
  }

  if (damageType === DAMAGE_TYPE.FIRE && fire) {
    if (fire > 100) {
      return 0;
    }

    return damage - Math.floor((damage / 100) * fire);
  }

  if (damageType === DAMAGE_TYPE.WIND && wind) {
    if (wind > 100) {
      return 0;
    }

    return damage - Math.floor((damage / 100) * wind);
  }

  if (damageType === DAMAGE_TYPE.EARTH && earth) {
    if (earth > 100) {
      return 0;
    }

    return damage - Math.floor((damage / 100) * earth);
  }

  if (damageType === DAMAGE_TYPE.LIGHT && light) {
    if (light > 100) {
      return 0;
    }

    return damage - Math.floor((damage / 100) * light);
  }

  if (damageType === DAMAGE_TYPE.LIGHT && dark) {
    if (dark > 100) {
      return 0;
    }

    return damage - Math.floor((damage / 100) * dark);
  }

  if (damageType === DAMAGE_TYPE.BLOOD && blood) {
    if (blood > 100) {
      return 0;
    }

    return damage - Math.floor((damage / 100) * blood);
  }

  if (damageType === DAMAGE_TYPE.POISON && poison) {
    if (poison > 100) {
      return 0;
    }

    return damage - Math.floor((damage / 100) * poison);
  }

  return damage;
};
