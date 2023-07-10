import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE } from 'modules/battlefield/constants';
import { rustyAxe, rustyMace, spikeMace } from 'factory/weapons';

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
    health: 30,
    currentHealth: 30,
    initiative: 1,
    attackType: ATTACK_TYPE.MELEE,
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
    health: 30,
    currentHealth: 30,
    initiative: 2,
    attackType: ATTACK_TYPE.MELEE,
    criticalChance: 5,
    criticalMultiplier: 2,
    defence: 0,
    evadeChance: 5
  }) as Trooper;
