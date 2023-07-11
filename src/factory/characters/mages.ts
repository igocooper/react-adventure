import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE } from 'modules/battlefield/constants';
import { waterMageStaff } from 'factory/weapons';

export const waterMage = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: waterMageStaff
    },
    abilities: [],
    effects: [],
    ...overrides,
    type: 'water-mage',
    baseDamage: '1-3',
    damage: '1-3',
    health: 50,
    currentHealth: 50,
    initiative: 6,
    attackType: ATTACK_TYPE.SPLASH,
    attackId: 'kraken',
    defence: 0
  }) as Trooper;
