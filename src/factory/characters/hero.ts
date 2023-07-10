import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE } from 'modules/battlefield/constants';
import { rustyBastardSword } from 'factory/weapons';

export const hero = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: rustyBastardSword
    },
    abilities: [],
    effects: [],
    ...overrides,
    type: 'hero',
    baseDamage: '3-3',
    damage: '3-3',
    health: 50,
    currentHealth: 50,
    initiative: 3,
    attackType: ATTACK_TYPE.MELEE,
    defence: 0
  }) as Trooper;
