import { createCharacter } from './createCharacter';
import type { Trooper } from 'modules/battlefield/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SKILL } from 'common/constants';
import { waterMageStaff } from 'factory/weapons';
import { ATTACK_ID_ICE_SPIKES } from 'modules/battlefield/characters/WaterMage/constants';
import { createKrakenSkill } from 'modules/battlefield/sagas/skillsSaga/skills/kraken';

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
    baseDamage: '1-3',
    damage: '1-3',
    health: 50,
    currentHealth: 50,
    initiative: 3,
    hitChance: 95,
    damageType: DAMAGE_TYPE.WATER,
    attackType: ATTACK_TYPE.SPLASH,
    attackId: ATTACK_ID_ICE_SPIKES,
    defence: 0
  }) as Trooper;
