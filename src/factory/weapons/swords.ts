import type { Weapon } from 'common/types';
import { WEAPON_TYPE } from 'common/constants';

export const darkMetalSword: Weapon = {
  name: 'Dark Metal Sword',
  type: WEAPON_TYPE.SWORD,
  imageSrc: '/images/weapons/swords/dark-metal-sword.png',
  stats: {
    damage: '5-16'
  }
};

export const longSword: Weapon = {
  name: 'Long Sword',
  type: WEAPON_TYPE.SWORD,
  imageSrc: '/images/weapons/swords/long-sword.png',
  stats: {
    damage: '10-21'
  }
};

export const bastardSword: Weapon = {
  name: 'Bastard Sword',
  type: WEAPON_TYPE.SWORD,
  imageSrc: '/images/weapons/swords/bastard-sword.png',
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

export const knightSword: Weapon = {
  name: 'Knight Sword',
  type: WEAPON_TYPE.SWORD,
  imageSrc: '/images/weapons/swords/knight-sword.png',
  stats: {
    damage: '5-8'
  }
};

export const swords = [
  darkMetalSword,
  bastardSword,
  meatCutter,
  longSword,
  knightSword
];
