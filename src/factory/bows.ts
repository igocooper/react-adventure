import type { Weapon } from 'common/types';

enum ATTACK_TYPE {
  RANGE = 'range',
  MELEE = 'melee',
  SPLASH = 'splash'
}

export const mountainBow: Weapon = {
  name: 'Mountain Bow',
  imageSrc: '/images/mountain-archer/Bow.png',
  damage: '10-15',
  attackType: ATTACK_TYPE.RANGE
};
