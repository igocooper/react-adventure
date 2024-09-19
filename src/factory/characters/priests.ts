import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SEX, SKILL } from 'common/constants';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';
import { oldWoodenStaff } from 'factory/weapons';
import { createContinuesHealAbility } from 'modules/battlefield/sagas/abilitiesSaga/abilities';
import { createHealSkill } from 'modules/battlefield/sagas/skillsSaga/skills';
import { clericArmor, clericHat } from '../armors';

export const priest1 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: oldWoodenStaff,
      armor: clericArmor,
      helmet: clericHat
    },
    abilities: [
      createContinuesHealAbility({
        duration: 3,
        heal: 10,
        hitChance: 100
      })
    ],
    effects: [],
    skills: {
      [SKILL.HEAL]: createHealSkill()
    },
    ...overrides,
    appearance: {
      headEarless: resolveAssetUrl(
        '/images/characters/priest-1/Head Earless.png'
      ),
      head: resolveAssetUrl('/images/characters/priest-1/Head.png'),
      headBeard: resolveAssetUrl('/images/beards/brown/08.png'),
      headHair: resolveAssetUrl('/images/hairs/brown/11.png'),
      face01: resolveAssetUrl('/images/characters/priest-1/Face 01.png'),
      face02: resolveAssetUrl('/images/characters/priest-1/Face 02.png'),
      face03: resolveAssetUrl('/images/characters/priest-1/Face 03.png')
    },
    type: 'priest-1',
    sex: SEX.MALE,
    baseDamage: '1-3',
    damage: '1-3',
    damageType: DAMAGE_TYPE.PHYSICAL,
    hitChance: 95,
    health: 50,
    currentHealth: 50,
    initiative: 2,
    attackType: ATTACK_TYPE.MELEE,
    defence: 0,
    healPower: 10,
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

export const priests = [priest1];
