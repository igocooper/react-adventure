import type { Weapon } from 'common/types';
import { WEAPON_TYPE } from 'common/constants';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';
export const spikeMace: Weapon = {
  name: 'Spike Mace',
  type: WEAPON_TYPE.MACE,
  imageUrls: {
    weapon: resolveAssetUrl('/images/weapons/maces/spike-mace.png'),
    slashFX: resolveAssetUrl('/images/slashFX/mace-default.png')
  },
  stats: {
    damage: '5-20'
  }
};

export const rustyMace: Weapon = {
  name: 'Rusty Mace',
  type: WEAPON_TYPE.MACE,
  imageUrls: {
    weapon: resolveAssetUrl('/images/weapons/maces/rusty-mace.png'),
    slashFX: resolveAssetUrl('/images/slashFX/mace-default.png')
  },
  stats: {
    damage: '5-7'
  }
};

export const holyMace: Weapon = {
  name: 'Holy Mace',
  type: WEAPON_TYPE.MACE,
  imageUrls: {
    weapon: resolveAssetUrl('/images/weapons/maces/holy-mace.png'),
    slashFX: resolveAssetUrl('/images/slashFX/holy-mace.png')
  },
  stats: {
    damage: '4-27'
  }
};

export const maces = [spikeMace, rustyMace, holyMace];
