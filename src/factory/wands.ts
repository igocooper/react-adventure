import type { Weapon } from 'common/types';

enum ATTACK_TYPE {
  RANGE = 'range',
  MELEE = 'melee',
  SPLASH = 'splash'
}

export const mountainWand: Weapon = {
  name: 'Mountain Wand',
  imageSrc: '/images/mountain-warrior-4/Left Hand Weapon.png',
  damage: '5-12',
  attackType: ATTACK_TYPE.SPLASH
};
