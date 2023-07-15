import type { Weapon } from 'common/types';

export const mountainStaff: Weapon = {
  name: 'Mountain Wand',
  imageSrc: '/images/mountain-mage/Left Hand Weapon.png',
  stats: {
    damage: '12-12'
  }
};

export const oldWoodenStaff: Weapon = {
  name: 'Old Wooden Staff',
  imageSrc: '/images/weapons/staffs/old-wooden-staff.png',
  stats: {
    damage: '3-5',
    power: 10
  }
};

export const waterMageStaff: Weapon = {
  name: 'Water Mage Staff',
  imageSrc: '/images/weapons/staffs/water-mage-staff.png',
  stats: {
    damage: '13-17'
  }
};

export const crookedStaff: Weapon = {
  name: 'Crooked Staff',
  imageSrc: '/images/weapons/staffs/crooked-staff.png',
  stats: {
    damage: '3-5'
  }
};
