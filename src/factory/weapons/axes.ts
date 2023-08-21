import type { Weapon } from 'common/types';
import { WEAPON_TYPE } from 'common/constants';

export const rustyAxe: Weapon = {
  name: 'Rusty Axe',
  type: WEAPON_TYPE.AXE,
  imageSrc: '/images/weapons/axes/rusty-axe.png',
  stats: {
    damage: '6-7'
  }
};

export const skullSmasher: Weapon = {
  name: 'Skull Smasher',
  type: WEAPON_TYPE.AXE,
  imageSrc: '/images/weapons/axes/skull-smasher.png',
  stats: {
    damage: '15-25'
  }
};
export const axes = [rustyAxe, skullSmasher];
