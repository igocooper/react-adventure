import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SEX, SKILL } from 'common/constants';
import {
  crookedStaff,
  rustyAxe,
  rustyMace,
  skullSmasher,
  spikeMace
} from 'factory/weapons';
import { createMightSkill } from 'modules/battlefield/sagas/skillsSaga/skills';
import { woodenRoundShield } from 'factory/armors';

export const goblin1 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: spikeMace,
      shield: woodenRoundShield
    },
    abilities: [],
    effects: [],
    skills: {},
    ...overrides,
    type: 'goblin-1',
    sex: SEX.MALE,
    baseDamage: '1-3',
    damage: '1-3',
    damageType: DAMAGE_TYPE.PHYSICAL,
    hitChance: 95,
    health: 25,
    currentHealth: 25,
    initiative: 1,
    attackType: ATTACK_TYPE.MELEE,
    defence: 0,
    resistance: {
      fire: 0,
      water: 0,
      blood: 0,
      poison: 0,
      dark: 0,
      light: 0,
      wind: 0,
      earth: 0
    }
  }) as Trooper;

export const goblin2 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: rustyMace
    },
    abilities: [],
    effects: [],
    skills: {},
    ...overrides,
    type: 'goblin-2',
    sex: SEX.MALE,
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
    defence: 0,
    resistance: {
      fire: 0,
      water: 0,
      blood: 0,
      poison: 0,
      dark: 0,
      light: 0,
      wind: 0,
      earth: 0
    }
  }) as Trooper;

export const goblin3 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      rightHand: rustyAxe
    },
    abilities: [],
    effects: [],
    skills: {},
    ...overrides,
    type: 'goblin-3',
    sex: SEX.MALE,
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
    evadeChance: 5,
    resistance: {
      fire: 0,
      water: 0,
      blood: 0,
      poison: 0,
      dark: 0,
      light: 0,
      wind: 0,
      earth: 0
    }
  }) as Trooper;

export const armoredGoblin = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      rightHand: skullSmasher,
      shield: woodenRoundShield
    },
    abilities: [],
    effects: [],
    skills: {},
    ...overrides,
    type: 'armored-goblin',
    sex: SEX.MALE,
    baseDamage: '3-3',
    damage: '3-3',
    damageType: DAMAGE_TYPE.PHYSICAL,
    health: 60,
    currentHealth: 60,
    initiative: 3,
    attackType: ATTACK_TYPE.MELEE,
    hitChance: 95,
    criticalChance: 5,
    criticalMultiplier: 2,
    defence: 20,
    evadeChance: 5,
    resistance: {
      fire: 0,
      water: 0,
      blood: 0,
      poison: 0,
      dark: 0,
      light: 0,
      wind: 0,
      earth: 0
    }
  }) as Trooper;

export const goblinBuffer = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: crookedStaff
    },
    abilities: [],
    effects: [],
    skills: {
      [SKILL.MIGHT]: createMightSkill({
        duration: 2,
        percent: 50
      })
    },
    ...overrides,
    type: 'goblin-buffer',
    sex: SEX.FEMALE,
    baseDamage: '3-4',
    damage: '3-4',
    damageType: DAMAGE_TYPE.PHYSICAL,
    health: 60,
    currentHealth: 60,
    initiative: 7,
    attackType: ATTACK_TYPE.MELEE,
    hitChance: 95,
    criticalChance: 7,
    criticalMultiplier: 2,
    defence: 20,
    evadeChance: 5,
    resistance: {
      fire: 0,
      water: 0,
      blood: 0,
      poison: 0,
      dark: 0,
      light: 0,
      wind: 0,
      earth: 0
    }
  }) as Trooper;

export const goblins = [goblinBuffer, armoredGoblin, goblin3, goblin2, goblin1];
