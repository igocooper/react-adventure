import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE } from 'common/constants';
import { mountainBow, mountainStaff } from 'factory/weapons';
import { ATTACK_ID } from 'modules/battlefield/characters/MoutainArcher/constants';
import { ATTACK_ID_FIRE_BALL } from 'modules/battlefield/characters/MountainMage/constants';

export const mountainWarrior1 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {},
    abilities: [],
    effects: [],
    ...overrides,
    type: 'mountain-warrior-1',
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

export const mountainMage = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: mountainStaff
    },
    abilities: [],
    effects: [],
    attackId: ATTACK_ID_FIRE_BALL,
    ...overrides,
    type: 'mountain-mage',
    baseDamage: '1-3',
    damage: '1-3',
    damageType: DAMAGE_TYPE.FIRE,
    attackType: ATTACK_TYPE.RANGE,
    hitChance: 95,
    health: 25,
    currentHealth: 25,
    initiative: 13,
    defence: 0,
    criticalChance: 5,
    criticalMultiplier: 2
  }) as Trooper;

export const mountainArcher = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      bow: mountainBow
    },
    abilities: [],
    effects: [],
    ...overrides,
    type: 'mountain-archer',
    baseDamage: '1-3',
    damage: '1-3',
    damageType: DAMAGE_TYPE.PHYSICAL,
    hitChance: 95,
    health: 25,
    currentHealth: 25,
    initiative: 5,
    attackType: ATTACK_TYPE.RANGE,
    attackId: ATTACK_ID,
    defence: 0,
    criticalChance: 10,
    criticalMultiplier: 2
  }) as Trooper;
