import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SEX, SKILL } from 'common/constants';
import { mountainBow, mountainStaff } from 'factory/weapons';
import { ATTACK_ID } from 'modules/battlefield/characters/MoutainArcher/constants';
import { ATTACK_ID_FIRE_BALL } from 'modules/battlefield/characters/MountainMage/constants';
import { createLavaGeyserSkill } from 'modules/battlefield/sagas/skillsSaga/skills/lavaGeyser';
import SFX from 'modules/SFX';

export const mountainWarrior1 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {},
    abilities: [],
    effects: [],
    skills: {},
    ...overrides,
    type: 'mountain-warrior-1',
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

export const mountainMage = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: mountainStaff
    },
    abilities: [],
    effects: [],
    skills: {
      [SKILL.LAVA_GEYSER]: createLavaGeyserSkill({
        percent: 100,
        coolDown: 3
      })
    },
    attackId: ATTACK_ID_FIRE_BALL,
    ...overrides,
    type: 'mountain-mage',
    sex: SEX.MALE,
    baseDamage: '1-3',
    damage: '1-3',
    damageType: DAMAGE_TYPE.FIRE,
    attackType: ATTACK_TYPE.RANGE,
    hitChance: 95,
    health: 25,
    currentHealth: 25,
    initiative: 3,
    castSFX: SFX.fireBall,
    defence: 0,
    criticalChance: 5,
    criticalMultiplier: 2,
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

export const mountainArcher = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      bow: mountainBow
    },
    abilities: [],
    effects: [],
    skills: {},
    ...overrides,
    type: 'mountain-archer',
    sex: SEX.MALE,
    baseDamage: '1-3',
    damage: '1-3',
    damageType: DAMAGE_TYPE.PHYSICAL,
    hitChance: 95,
    health: 160,
    currentHealth: 160,
    initiative: 5,
    attackType: ATTACK_TYPE.RANGE,
    attackId: ATTACK_ID,
    defence: 0,
    criticalChance: 10,
    criticalMultiplier: 2,
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

export const mountainWarriors = [
  mountainArcher,
  mountainMage,
  mountainWarrior1
];
