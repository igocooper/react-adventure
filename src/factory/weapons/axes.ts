import type { Weapon } from 'common/types';
import { WEAPON_TYPE } from 'common/constants';

export const rustyAxe: Weapon = {
  name: 'Rusty Axe',
  type: WEAPON_TYPE.AXE,
  imageUrls: {
    weapon: '/images/weapons/axes/rusty-axe.png',
    slashFX: '/images/slashFX/axe-default.png'
  },
  stats: {
    damage: '6-7'
  }
};

export const skullSmasher: Weapon = {
  name: 'Skull Smasher',
  type: WEAPON_TYPE.AXE,
  imageUrls: {
    weapon: '/images/weapons/axes/skull-smasher.png',
    slashFX: '/images/slashFX/skull-smasher.png'
  },
  stats: {
    damage: '15-25'
  }
};
export const axes = [rustyAxe, skullSmasher];
