import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE } from 'common/constants';
import { waterMageStaff } from 'factory/weapons';
import { ATTACK_ID_KRAKEN } from 'modules/battlefield/characters/WaterMage/constants';

export const waterMage = (overrides: Partial<Trooper>) =>
  createCharacter({
    equipment: {
      leftHand: waterMageStaff
    },
    abilities: [],
    effects: [],
    ...overrides,
    type: 'water-mage',
    baseDamage: '1-3',
    damage: '1-3',
    health: 50,
    currentHealth: 50,
    initiative: 3,
    hitChance: 95,
    damageType: DAMAGE_TYPE.WATER,
    attackType: ATTACK_TYPE.SPLASH,
    attackId: ATTACK_ID_KRAKEN,
    defence: 0
  }) as Trooper;
