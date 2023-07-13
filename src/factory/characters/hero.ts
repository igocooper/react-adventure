import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE } from 'common/constants';
import { rustyBastardSword } from 'factory/weapons';

export const hero = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: rustyBastardSword
    },
    abilities: [],
    effects: [],
    ...overrides,
    appearance: {
      headEarless: '/images/hero/Head Earless.png',
      head: '/images/hero/Head.png',
      headBeard: '/images/hero/Head Beard.png',
      headHair: '/images/hero/Head Hair.png',
      face01: '/images/hero/Face 01.png',
      face02: '/images/hero/Face 02.png',
      face03: '/images/hero/Face 03.png'
    },
    type: 'hero',
    baseDamage: '3-3',
    damage: '3-3',
    damageType: DAMAGE_TYPE.PHYSICAL,
    hitChance: 95,
    health: 50,
    currentHealth: 50,
    initiative: 3,
    attackType: ATTACK_TYPE.MELEE,
    defence: 0
  }) as Trooper;
