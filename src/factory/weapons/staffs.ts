import type { Weapon } from 'common/types';
import { WEAPON_TYPE } from 'common/constants';

export const mountainStaff: Weapon = {
  name: 'Mountain Wand',
  type: WEAPON_TYPE.WOODEN_STAFF,
  imageUrls: {
    weapon: '/images/weapons/staffs/mountain-wand.png',
    slashFX: '/images/slashFX/staff-default.png'
  },
  stats: {
    damage: '12-12'
  }
};

export const oldWoodenStaff: Weapon = {
  name: 'Old Wooden Staff',
  type: WEAPON_TYPE.WOODEN_STAFF,
  imageUrls: {
    weapon: '/images/weapons/staffs/old-wooden-staff.png',
    slashFX: '/images/slashFX/staff-default.png'
  },
  stats: {
    damage: '3-5',
    healPower: 10
  }
};

export const waterMageStaff: Weapon = {
  name: 'Water Mage Staff',
  type: WEAPON_TYPE.WOODEN_STAFF,
  imageUrls: {
    weapon: '/images/weapons/staffs/water-mage-staff.png',
    slashFX: '/images/slashFX/water-mage-staff.png'
  },
  stats: {
    damage: '13-17'
  }
};

export const crookedStaff: Weapon = {
  name: 'Crooked Staff',
  type: WEAPON_TYPE.WOODEN_STAFF,
  imageUrls: {
    weapon: '/images/weapons/staffs/crooked-staff.png',
    slashFX: '/images/slashFX/water-mage-staff.png'
  },
  stats: {
    damage: '3-5'
  }
};
export const staffs = [
  mountainStaff,
  oldWoodenStaff,
  waterMageStaff,
  crookedStaff
];
