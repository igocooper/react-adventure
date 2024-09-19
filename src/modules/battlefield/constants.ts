import type { Trooper } from './types';
import {
  goblin1,
  goblin2,
  goblin3,
  armoredGoblin,
  mountainMage,
  waterMage,
  priest1,
  goblinBuffer,
  paladin,
  darkPaladin,
  hero
} from 'factory/characters';
import { createPoisonAbility } from './sagas/abilitiesSaga/abilities';
import { addBaseTrooperProperties } from './helpers/addBaseTrooperProperties';

export enum TROOPER_TEAM {
  ATTACKERS = 'attackers',
  DEFENDERS = 'defenders'
}

export enum HOVERED_ELEMENT_TYPE {
  DEFAULT = 'default',
  CHARACTER = 'character'
}

export enum AI_TYPE {
  RANDOM = 'random',
  DETERMINED = 'determined',
  STRATEGIC = 'strategic',
  SUPPORT_RANDOM = 'support_random',
  HEALER_RANDOM = 'healer_random'
}

export enum LOCATION {
  FOREST_ROAD = 'forest-road',
  CASTLE_THRONE_HALL = 'castle-throne-hall',
  CASTLE_HALL = 'castle-hall',
  CASTLE_COURTYARD = 'castle-courtyard',
  CASTLE_DUNGEON = 'castle-dungeon',
  DRAGON_DUNGEON_LAVA = 'dragon-dungeon-lava',
  DRAGON_DUNGEON_LAIR = 'dragon-dungeon-lair',
  DRAGON_DUNGEON_ENTRANCE = 'dragon-dungeon-entrance',
  DRAGON_DUNGEON_TREASURE = 'dragon-dungeon-treasure',
  GRAVEYARD_ARENA = 'graveyard-arena',
  ICE_ARENA = 'ice-arena',
  LAVA_ARENA = 'lava-arena',
  FOREST_ARENA = 'forest-arena',
  GOBLIN_VILLAGE_OUTPOST = 'goblin-village-outpost',
  GOBLIN_VILLAGE_THRONE_HALL = 'goblin-village-throne-hall',
  GOBLIN_VILLAGE__BRIDGE = 'goblin-village-bridge',
  GOBLIN_VILLAGE_ENTRANCE = 'goblin-village-entrance',
  CAVE = 'cave',
  CAVE_CRYSTALS = 'cave-crystals',
  CAVE_LAVA = 'cave-lava',
  CAVE_SPIDERS = 'cave-spiders',
  FOREST = 'forest',
  ELVEN_FOREST = 'elven-forest',
  FOREST_2 = 'forest-2',
  FOREST_3 = 'forest-3'
}

const ATTACKERS_TROOPS: Trooper[] = [
  hero({
    id: 1,
    team: 'attackers',
    position: 2,
    abilities: []
  }),
  priest1({
    id: 2,
    team: 'attackers',
    position: 4
  }),
  darkPaladin({
    id: 3,
    team: 'attackers',
    position: 1
  }),
  mountainMage({
    id: 5,
    team: 'attackers',
    position: 6
  }),
  waterMage({
    id: 4,
    team: 'attackers',
    position: 5
  }),
  paladin({
    id: 6,
    team: 'attackers',
    position: 3
  })
];

const DEFENDERS_TROOPS: Trooper[] = [
  goblin1({
    id: 101,
    position: 1,
    team: 'defenders',
    AIType: AI_TYPE.STRATEGIC
  }),
  armoredGoblin({
    id: 102,
    position: 2,
    team: 'defenders',
    abilities: [
      createPoisonAbility({
        duration: 2,
        damage: 10,
        hitChance: 75
      })
    ],
    AIType: AI_TYPE.STRATEGIC
  }),
  goblin3({
    id: 103,
    position: 3,
    team: 'defenders',
    AIType: AI_TYPE.STRATEGIC
  }),
  goblin2({
    id: 104,
    position: 4,
    team: 'defenders',
    AIType: AI_TYPE.STRATEGIC
  }),
  goblinBuffer({
    id: 105,
    position: 5,
    team: 'defenders',
    AIType: AI_TYPE.SUPPORT_RANDOM
  })
];

export const ATTACKERS = addBaseTrooperProperties(ATTACKERS_TROOPS);
export const DEFENDERS = addBaseTrooperProperties(DEFENDERS_TROOPS);

export const AREA_CONTAINER_ID = 'area-container';
