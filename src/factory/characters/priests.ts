import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SEX, SKILL } from 'common/constants';
import { oldWoodenStaff } from 'factory/weapons';
import { createContinuesHealAbility } from 'modules/battlefield/sagas/abilitiesSaga/abilities';
import { createHealSkill } from 'modules/battlefield/sagas/skillsSaga/skills';

export const priest1 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: oldWoodenStaff
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
    healPower: 10
  }) as Trooper;

export const priests = [priest1]
