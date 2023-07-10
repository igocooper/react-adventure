import type { Weapon } from 'common/types';

enum ATTACK_TYPE {
  RANGE = 'range',
  MELEE = 'melee',
  SPLASH = 'splash'
}

export const mountainStaff: Weapon = {
  name: 'Mountain Wand',
  imageSrc: '/images/mountain-warrior-4/Left Hand Weapon.png',
  damage: '5-12',
  attackType: ATTACK_TYPE.SPLASH
};

export const oldWoodenStaff: Weapon = {
  name: 'Old Wooden Staff',
  imageSrc: '/images/weapons/staffs/old-wooden-staff.png',
  damage: '3-5',
  power: 10,
  attackType: ATTACK_TYPE.MELEE
};