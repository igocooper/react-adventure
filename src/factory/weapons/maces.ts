import type { Weapon } from 'common/types';
import { WEAPON_TYPE } from 'common/constants';
export const spikeMace: Weapon = {
  name: 'Spike Mace',
  type: WEAPON_TYPE.MACE,
  imageUrls: {
    weapon: '/images/weapons/maces/spike-mace.png',
    slashFX: '/images/slashFX/mace-default.png'
  },
  stats: {
    damage: '5-20'
  }
};

export const rustyMace: Weapon = {
  name: 'Rusty Mace',
  type: WEAPON_TYPE.MACE,
  imageUrls: {
    weapon: '/images/weapons/maces/rusty-mace.png',
    slashFX: '/images/slashFX/mace-default.png'
  },
  stats: {
    damage: '5-7'
  }
};

export const holyMace: Weapon = {
  name: 'Holy Mace',
  type: WEAPON_TYPE.MACE,
  imageUrls: {
    weapon: '/images/weapons/maces/holy-mace.png',
    slashFX: '/images/slashFX/holy-mace.png'
  },
  stats: {
    damage: '4-27'
  }
};

export const maces = [spikeMace, rustyMace, holyMace];
