import type { Weapon } from 'common/types';
import { WEAPON_TYPE } from 'common/constants';

export const golemSword: Weapon = {
  name: 'Golem Sword',
  type: WEAPON_TYPE.SWORD,
  imageSrc: '/images/golem-3/Left Hand Weapon.png',
  stats: {
    damage: '5-16'
  }
};

export const rustyBastardSword: Weapon = {
  name: 'Rusty Bastard Sword',
  type: WEAPON_TYPE.SWORD,
  imageSrc: '/images/hero/Left Hand Weapon.png',
  stats: {
    damage: '5-10',
    criticalChance: 10,
    criticalMultiplier: 2
  }
};

export const meatCutter: Weapon = {
  name: 'Meat Cutter',
  type: WEAPON_TYPE.SWORD,
  imageSrc: '/images/weapons/swords/meat-cutter.png',
  stats: {
    damage: '5-8',
    criticalChance: 10,
    criticalMultiplier: 2
  }
};

export const swords = [golemSword, rustyBastardSword, meatCutter];
