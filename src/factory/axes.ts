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
