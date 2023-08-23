import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SEX, SKILL } from 'common/constants';
import { createLightningStrikeAbility } from 'modules/battlefield/sagas/abilitiesSaga/abilities';
import { longSword, holyMace, knightSword } from 'factory/weapons';
import {
  darkPaladinArmor,
  darkPaladinShield,
  paladinShield,
  paladinArmor,
  paladinChiefShield,
  paladinChiefArmor
} from '../armors';
import {
  createDivineShieldSkill,
  createDivineHealSkill
} from 'modules/battlefield/sagas/skillsSaga/skills';

export const paladin = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: holyMace,
      armor: paladinArmor,
      // helmet: paladinHelmet,
      shield: paladinShield
    },
    abilities: [
      createLightningStrikeAbility({
        damage: 15,
        hitChance: 100
      })
    ],
    effects: [],
    skills: {
      [SKILL.DIVINE_SHIELD]: createDivineShieldSkill(),
      [SKILL.DIVINE_HEAL]: createDivineHealSkill()
    },
    ...overrides,
    appearance: {
      headEarless: '/images/paladin/Head Earless.png',
      head: '/images/paladin/Head.png',
      headBeard: '/images/beards/Beard Black.png',
      headHair: '/images/hairs/Hair Grey Short.png',
      face01: '/images/paladin/Face 01.png',
      face02: '/images/paladin/Face 02.png',
      face03: '/images/paladin/Face 03.png'
    },
    type: 'paladin',
    sex: SEX.MALE,
    baseDamage: '1-3',
    damage: '1-3',
    health: 80,
    currentHealth: 80,
    initiative: 400,
    hitChance: 95,
    damageType: DAMAGE_TYPE.PHYSICAL,
    attackType: ATTACK_TYPE.MELEE,
    defence: 0
  }) as Trooper;

export const darkPaladin = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: longSword,
      armor: darkPaladinArmor,
      // helmet: darkPaladinHelmet,
      shield: darkPaladinShield
    },
    abilities: [],
    effects: [],
    skills: {
      [SKILL.DIVINE_SHIELD]: createDivineShieldSkill(),
      [SKILL.DIVINE_HEAL]: createDivineHealSkill()
    },
    ...overrides,
    appearance: {
      headEarless: '/images/dark-paladin/Head Earless.png',
      head: '/images/paladin/Head.png',
      headBeard: '/images/beards/Beard Small.png',
      headHair: '/images/hairs/Hair Black Long.png',
      face01: '/images/dark-paladin/Face 01.png',
      face02: '/images/dark-paladin/Face 02.png',
      face03: '/images/dark-paladin/Face 03.png'
    },
    type: 'dark-paladin',
    sex: SEX.MALE,
    baseDamage: '1-3',
    damage: '1-3',
    health: 80,
    currentHealth: 80,
    initiative: 4,
    hitChance: 95,
    damageType: DAMAGE_TYPE.PHYSICAL,
    attackType: ATTACK_TYPE.MELEE,
    defence: 0
  }) as Trooper;

export const paladinChief = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: knightSword,
      armor: paladinChiefArmor,
      // helmet: paladinChiefHelmet,
      shield: paladinChiefShield
    },
    abilities: [],
    effects: [],
    skills: {
      [SKILL.DIVINE_SHIELD]: createDivineShieldSkill(),
      [SKILL.DIVINE_HEAL]: createDivineHealSkill()
    },
    ...overrides,
    type: 'paladin-chief',
    sex: SEX.MALE,
    baseDamage: '1-3',
    damage: '1-3',
    health: 100,
    currentHealth: 100,
    initiative: 4,
    hitChance: 95,
    counterAttackChance: 35,
    damageType: DAMAGE_TYPE.PHYSICAL,
    attackType: ATTACK_TYPE.MELEE,
    defence: 0
  }) as Trooper;

export const paladins = [paladin, darkPaladin, paladinChief];
