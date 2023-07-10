import type { Weapon } from 'common/types';

enum ATTACK_TYPE {
  RANGE = 'range',
  MELEE = 'melee',
  SPLASH = 'splash'
}

export const spikeMace: Weapon = {
  name: 'Spike Mace',
  imageSrc: '/images/weapons/maces/spike-mace.png',
  damage: '5-20',
  attackType: ATTACK_TYPE.MELEE
};

export const rustyMace: Weapon = {
  name: 'Spike Mace',
  imageSrc: '/images/weapons/maces/rusty-mace.png',
  damage: '5-7',
  attackType: ATTACK_TYPE.MELEE
};
