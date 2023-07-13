import type { Weapon } from 'common/types';

enum ATTACK_TYPE {
  RANGE = 'range',
  MELEE = 'melee',
  SPLASH = 'splash'
}

export const mountainStaff: Weapon = {
  name: 'Mountain Wand',
  imageSrc: '/images/mountain-mage/Left Hand Weapon.png',
  damage: '12-12',
  attackType: ATTACK_TYPE.SPLASH
};

export const oldWoodenStaff: Weapon = {
  name: 'Old Wooden Staff',
  imageSrc: '/images/weapons/staffs/old-wooden-staff.png',
  damage: '3-5',
  power: 10,
  attackType: ATTACK_TYPE.MELEE
};

export const waterMageStaff: Weapon = {
  name: 'Water Mage Staff',
  imageSrc: '/images/weapons/staffs/water-mage-staff.png',
  damage: '13-17',
  attackType: ATTACK_TYPE.SPLASH
};

export const crookedStaff: Weapon = {
  name: 'Crooked Staff',
  imageSrc: '/images/weapons/staffs/crooked-staff.png',
  damage: '3-5',
  attackType: ATTACK_TYPE.MELEE
};
