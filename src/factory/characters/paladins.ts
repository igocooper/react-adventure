import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SEX, SKILL } from 'common/constants';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';
import { createLightningStrikeAbility } from 'modules/battlefield/sagas/abilitiesSaga/abilities';
import { longSword, holyMace, knightSword } from 'factory/weapons';
import {
  darkPaladinArmor,
  darkPaladinShield,
  paladinShield,
  paladinArmor,
  paladinHelmet,
  paladinChiefShield,
  darkPaladinHelmet,
  paladinChiefHelmet,
  paladinChiefArmor
} from '../armors';
import {
  createDivineShieldSkill,
  createDivineHealSkill,
  createResurrectionSkill,
  createHealSkill
} from 'modules/battlefield/sagas/skillsSaga/skills';

export const paladin = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: holyMace,
      armor: paladinArmor,
      helmet: paladinHelmet,
      shield: paladinShield
    },
    abilities: [
      createLightningStrikeAbility({
        damage: 45,
        hitChance: 100
      })
    ],
    effects: [],
    skills: {
      [SKILL.DIVINE_SHIELD]: createDivineShieldSkill(),
      [SKILL.HEAL]: createHealSkill()
    },
    ...overrides,
    appearance: {
      headEarless: resolveAssetUrl(
        resolveAssetUrl('/images/characters/paladin/Head Earless.png')
      ),
      head: resolveAssetUrl('/images/characters/paladin/Head.png'),
      headBeard: resolveAssetUrl('/images/characters/paladin/Head Beard.png'),
      headHair: resolveAssetUrl('/images/characters/paladin/Head Hair.png'),
      face01: resolveAssetUrl('/images/characters/paladin/Face 01.png'),
      face02: resolveAssetUrl('/images/characters/paladin/Face 02.png'),
      face03: resolveAssetUrl('/images/characters/paladin/Face 03.png')
    },
    type: 'paladin',
    sex: SEX.MALE,
    baseDamage: '1-3',
    damage: '1-3',
    health: 80,
    currentHealth: 80,
    initiative: 4,
    hitChance: 95,
    damageType: DAMAGE_TYPE.PHYSICAL,
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

export const darkPaladin = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: longSword,
      armor: darkPaladinArmor,
      helmet: darkPaladinHelmet,
      shield: darkPaladinShield
    },
    abilities: [],
    effects: [],
    skills: {
      [SKILL.DIVINE_SHIELD]: createDivineShieldSkill(),
      [SKILL.HEAL]: createHealSkill()
    },
    ...overrides,
    appearance: {
      headEarless: resolveAssetUrl(
        '/images/characters/dark-paladin/Head Earless.png'
      ),
      head: resolveAssetUrl('/images/characters/dark-paladin/Head.png'),
      headBeard: resolveAssetUrl(
        '/images/characters/dark-paladin/Head Beard.png'
      ),
      headHair: resolveAssetUrl(
        '/images/characters/dark-paladin/Head Hair.png'
      ),
      face01: resolveAssetUrl('/images/characters/dark-paladin/Face 01.png'),
      face02: resolveAssetUrl('/images/characters/dark-paladin/Face 02.png'),
      face03: resolveAssetUrl('/images/characters/dark-paladin/Face 03.png')
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
    defence: 0,
    resistance: {
      fire: 0,
      water: 0,
      blood: 0,
      poison: 0,
      dark: 30,
      light: 0,
      wind: 0,
      earth: 0
    }
  }) as Trooper;

export const paladinChief = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: knightSword,
      armor: paladinChiefArmor,
      helmet: paladinChiefHelmet,
      shield: paladinChiefShield
    },
    abilities: [],
    effects: [],
    skills: {
      [SKILL.DIVINE_SHIELD]: createDivineShieldSkill({
        duration: 1
      }),
      [SKILL.DIVINE_HEAL]: createDivineHealSkill(),
      [SKILL.RESURRECTION]: createResurrectionSkill()
    },
    ...overrides,
    appearance: {
      headEarless: resolveAssetUrl(
        '/images/characters/paladin-chief/Head Earless.png'
      ),
      head: resolveAssetUrl('/images/characters/paladin-chief/Head.png'),
      headBeard: resolveAssetUrl('/images/beards/yellow/06.png'),
      headHair: resolveAssetUrl('/images/hairs/yellow/06.png'),
      face01: resolveAssetUrl('/images/characters/paladin-chief/Face 01.png'),
      face02: resolveAssetUrl('/images/characters/paladin-chief/Face 02.png'),
      face03: resolveAssetUrl('/images/characters/paladin-chief/Face 03.png')
    },
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
    defence: 0,
    resistance: {
      fire: 0,
      water: 0,
      blood: 0,
      poison: 0,
      dark: 40,
      light: 0,
      wind: 0,
      earth: 0
    }
  }) as Trooper;

export const paladins = [paladin, darkPaladin, paladinChief];
