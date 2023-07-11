import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE } from 'common/constants';
import { mountainBow, mountainStaff } from 'factory/weapons';

export const mountainWarrior1 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {},
    abilities: [],
    effects: [],
    ...overrides,
    type: 'mountain-warrior-1',
    baseDamage: '1-3',
    damage: '1-3',
    health: 25,
    currentHealth: 25,
    initiative: 1,
    attackType: ATTACK_TYPE.MELEE,
    defence: 0
  }) as Trooper;

export const mountainWarrior4 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: mountainStaff
    },
    abilities: [],
    effects: [],
    ...overrides,
    type: 'mountain-warrior-4',
    baseDamage: '1-3',
    damage: '1-3',
    health: 25,
    currentHealth: 25,
    initiative: 9,
    attackType: ATTACK_TYPE.SPLASH,
    attackId: 'magma-geysers',
    defence: 0,
    criticalChance: 5,
    criticalMultiplier: 2
  }) as Trooper;

export const mountainWarrior5 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: mountainBow
    },
    abilities: [],
    effects: [],
    ...overrides,
    type: 'mountain-warrior-5',
    baseDamage: '1-3',
    damage: '1-3',
    health: 25,
    currentHealth: 25,
    initiative: 5,
    attackType: ATTACK_TYPE.RANGE,
    attackId: 'mountainArcherArrow',
    defence: 0,
    criticalChance: 10,
    criticalMultiplier: 2
  }) as Trooper;
