import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SUPPORT_TYPE } from 'common/constants';
import {
  crookedStaff,
  rustyAxe,
  rustyMace,
  skullSmasher,
  spikeMace
} from 'factory/weapons';
import { createMightAbility } from '../../modules/battlefield/sagas/abilitiesSaga/abilities';

export const goblin1 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: rustyAxe
    },
    abilities: [],
    effects: [],
    ...overrides,
    type: 'goblin-1',
    baseDamage: '1-3',
    damage: '1-3',
    damageType: DAMAGE_TYPE.PHYSICAL,
    hitChance: 95,
    health: 25,
    currentHealth: 25,
    initiative: 1,
    attackType: ATTACK_TYPE.MELEE,
    defence: 0
  }) as Trooper;

export const goblin2 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: rustyMace
    },
    abilities: [],
    effects: [],
    ...overrides,
    type: 'goblin-2',
    baseDamage: '2-3',
    damage: '2-3',
    damageType: DAMAGE_TYPE.PHYSICAL,
    health: 30,
    currentHealth: 30,
    initiative: 1,
    attackType: ATTACK_TYPE.MELEE,
    hitChance: 95,
    criticalChance: 10,
    criticalMultiplier: 1.5,
    defence: 0
  }) as Trooper;

export const goblin3 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: spikeMace
    },
    abilities: [],
    effects: [],
    ...overrides,
    type: 'goblin-3',
    baseDamage: '3-4',
    damage: '3-4',
    damageType: DAMAGE_TYPE.PHYSICAL,
    health: 30,
    currentHealth: 30,
    initiative: 2,
    attackType: ATTACK_TYPE.MELEE,
    hitChance: 95,
    criticalChance: 5,
    criticalMultiplier: 2,
    defence: 0,
    evadeChance: 5
  }) as Trooper;

export const armoredGoblin = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: skullSmasher
    },
    abilities: [],
    effects: [],
    ...overrides,
    type: 'armored-goblin',
    baseDamage: '3-4',
    damage: '3-4',
    damageType: DAMAGE_TYPE.PHYSICAL,
    health: 60,
    currentHealth: 60,
    initiative: 3,
    attackType: ATTACK_TYPE.MELEE,
    hitChance: 95,
    criticalChance: 5,
    criticalMultiplier: 2,
    defence: 20,
    evadeChance: 5
  }) as Trooper;

export const goblinBuffer = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: crookedStaff
    },
    abilities: [
      createMightAbility({
        duration: 2,
        multiplier: 1.5
      })
    ],
    effects: [],
    ...overrides,
    type: 'goblin-buffer',
    baseDamage: '3-4',
    damage: '3-4',
    damageType: DAMAGE_TYPE.PHYSICAL,
    health: 60,
    currentHealth: 60,
    initiative: 6,
    attackType: ATTACK_TYPE.MELEE,
    supportType: SUPPORT_TYPE.BUFF,
    hitChance: 95,
    criticalChance: 5,
    criticalMultiplier: 2,
    defence: 20,
    evadeChance: 5
  }) as Trooper;
