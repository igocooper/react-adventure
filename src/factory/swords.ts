import type { Weapon } from 'common/types';

enum ATTACK_TYPE {
  RANGE = 'range',
  MELEE = 'melee',
  SPLASH = 'splash'
}

export const golemSword: Weapon = {
  name: 'Golem Sword',
  imageSrc: '/images/golem-3/Left Hand Weapon.png',
  damage: '5-16',
  attackType: ATTACK_TYPE.MELEE
};

export const rustyBastardSword: Weapon = {
  name: 'Rusty Bastard Sword',
  imageSrc: '/images/hero/Left Hand Weapon.png',
  damage: '5-10',
  attackType: ATTACK_TYPE.MELEE,
  criticalChance: 10,
  criticalMultiplier: 2
};
