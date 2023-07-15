import type { Trooper } from './types';
import {
  goblin1,
  goblin2,
  goblin3,
  hero,
  armoredGoblin,
  mountainArcher,
  mountainMage,
  waterMage,
  priest1,
  goblinBuffer
} from 'factory/characters';
import {
  createAnchorAbility,
  createPoisonAbility
} from './sagas/abilitiesSaga/abilities';

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
  SUPPORT_RANDOM = 'support_random'
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
    position: 2
  }),
  priest1({
    id: 2,
    team: 'attackers',
    position: 4
  }),
  mountainArcher({
    id: 3,
    team: 'attackers',
    position: 5
  }),
  mountainMage({
    id: 5,
    team: 'attackers',
    position: 1
  }),
  waterMage({
    id: 4,
    team: 'attackers',
    position: 6
  })
];

const DEFENDERS_TROOPS: Trooper[] = [
  goblin1({
    id: 101,
    position: 1,
    team: 'defenders'
  }),
  armoredGoblin({
    id: 102,
    position: 2,
    team: 'defenders',
    abilities: [
      createPoisonAbility({
        duration: 1,
        damage: 10,
        hitChance: 75
      }),
      createAnchorAbility({
        duration: 1
      })
    ]
  }),
  goblin3({
    id: 103,
    position: 3,
    team: 'defenders'
  }),
  goblin2({
    id: 104,
    position: 4,
    team: 'defenders'
  }),
  goblinBuffer({
    id: 105,
    position: 5,
    team: 'defenders'
  })
];

export const ATTACKERS = ATTACKERS_TROOPS;
export const DEFENDERS = DEFENDERS_TROOPS;

export const AREA_CONTAINER_ID = 'area-container';
