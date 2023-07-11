import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, SUPPORT_TYPE } from 'common/constants';
import { oldWoodenStaff } from 'factory/weapons';
import { createHealAbility } from '../../modules/battlefield/sagas/abilitiesSaga/abilities/heal';

export const priest1 = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: oldWoodenStaff
    },
    abilities: [
      createHealAbility({
        duration: 3,
        heal: 10,
        hitChance: 100
      })
    ],
    effects: [],
    ...overrides,
    type: 'priest-1',
    baseDamage: '1-3',
    damage: '1-3',
    health: 50,
    currentHealth: 50,
    initiative: 1,
    attackType: ATTACK_TYPE.MELEE,
    supportType: SUPPORT_TYPE.HEAL,
    defence: 0,
    power: 10
  }) as Trooper;
