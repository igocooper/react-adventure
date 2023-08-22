import type { Shield } from 'common/types';

export const woodenRoundShield: Shield = {
  name: 'Wooden Round Shield',
  imageSrc: '/images/shields/wooden-round-shield.png',
  stats: {
    defence: 3
  }
};

export const paladinChiefShield: Shield = {
  name: 'Paladin Chief Shield',
  imageSrc: '/images/shields/paladin-chief-shield.png',
  stats: {
    defence: 10
  }
};

export const paladinShield: Shield = {
  name: 'Paladin Shield',
  imageSrc: '/images/shields/paladin-shield.png',
  stats: {
    defence: 7
  }
};

export const darkPaladinShield: Shield = {
  name: 'Dark Paladin Shield',
  imageSrc: '/images/shields/dark-paladin-shield.png',
  stats: {
    defence: 7
  }
};

export const shields = [
  darkPaladinShield,
  paladinShield,
  paladinChiefShield,
  woodenRoundShield
];
