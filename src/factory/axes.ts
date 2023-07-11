import type { Weapon } from 'common/types';

enum ATTACK_TYPE {
  RANGE = 'range',
  MELEE = 'melee',
  SPLASH = 'splash'
}

export const rustyAxe: Weapon = {
  name: 'Spike Mace',
  imageSrc: '/images/weapons/axes/rusty-axe.png',
  damage: '6-7',
  attackType: ATTACK_TYPE.MELEE
};

export const skullSmasher: Weapon = {
  name: 'Skull Smasher',
  imageSrc: '/images/weapons/axes/skull-smasher.png',
  damage: '15-25',
  attackType: ATTACK_TYPE.MELEE
};
