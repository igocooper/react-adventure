import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SEX, SKILL } from 'common/constants';
import { waterMageStaff } from 'factory/weapons';
import { ATTACK_ID_ICE_SPIKES } from 'modules/battlefield/characters/WaterMage/constants';
import { createKrakenSkill } from 'modules/battlefield/sagas/skillsSaga/skills/kraken';
import SFX from 'modules/SFX';

export const waterMage = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: waterMageStaff
    },
    abilities: [],
    effects: [],
    skills: {
      [SKILL.KRAKEN]: createKrakenSkill({
        damageMod: 0.3,
        coolDown: 3
      })
    },
    ...overrides,
    type: 'water-mage',
    sex: SEX.MALE,
    baseDamage: '1-3',
    damage: '1-3',
    health: 50,
    currentHealth: 50,
    initiative: 3,
    hitChance: 95,
    damageType: DAMAGE_TYPE.WATER,
    attackType: ATTACK_TYPE.SPLASH,
    attackId: ATTACK_ID_ICE_SPIKES,
    castSFX: SFX.iceSpikes,
    defence: 0,
    resistance: {
      fire: 0,
      water: 0,
      blood: 0,
      poison: 0,
      dark: 0,
      light: 0,
      wind: 5,
      earth: 0
    }
  }) as Trooper;

export const mages = [waterMage];
