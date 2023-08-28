import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SKILL, SEX } from 'common/constants';
import { bastardSword } from 'factory/weapons';
import { armoredGoblinHelmet, paladinArmor } from '../armors';
import {
  createHemorrhageSkill,
  createRageSkill,
  createDissarmSkill
} from 'modules/battlefield/sagas/skillsSaga/skills';

export const hero = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: bastardSword,
      rightHand: bastardSword,
      armor: paladinArmor,
      helmet: armoredGoblinHelmet
    },
    abilities: [],
    effects: [],
    skills: {
      [SKILL.HEMORRHAGE_HACK]: createHemorrhageSkill({
        damage: 4,
        coolDown: 2
      }),
      [SKILL.RAGE]: createRageSkill({
        duration: 2,
        coolDown: 6
      }),
      [SKILL.DISSARM]: createDissarmSkill({
        percent: 80,
        duration: 2,
        coolDown: 1
      })
    },
    ...overrides,
    appearance: {
      headEarless: '/images/characters/hero/Head Earless.png',
      head: '/images/characters/hero/Head.png',
      headBeard: '/images/characters/hero/Head Beard.png',
      headHair: '/images/characters/hero/Head Hair.png',
      face01: '/images/characters/hero/Face 01.png',
      face02: '/images/characters/hero/Face 02.png',
      face03: '/images/characters/hero/Face 03.png'
    },
    type: 'hero',
    sex: SEX.MALE,
    baseDamage: '3-3',
    damage: '10-10',
    damageType: DAMAGE_TYPE.PHYSICAL,
    hitChance: 95,
    health: 50,
    currentHealth: 50,
    initiative: 4,
    attackType: ATTACK_TYPE.MELEE,
    counterAttackChance: 100,
    criticalChance: 20,
    criticalMultiplier: 2,
    evadeChance: 3,
    defence: 10,
    resistance: {
      fire: 10,
      water: 10,
      blood: 10,
      poison: 10,
      dark: 10,
      light: 10,
      wind: 5,
      earth: 0
    }
  }) as Trooper;
