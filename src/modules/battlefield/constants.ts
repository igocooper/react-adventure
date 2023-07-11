import type { Trooper } from './types';
import {
  goblin1,
  goblin2,
  goblin3,
  hero,
  mountainWarrior5,
  mountainWarrior4,
  priest1
} from 'factory/characters';

export enum CURSOR {
  DEFAULT = 'default',
  BOW = 'bow',
  DISABLED = 'disabled',
  WAND = 'wand',
  SWORD = 'sword'
}

export enum ABILITY {
  POISON = 'poison'
}

export enum EFFECT {
  POISON = 'poison',
  ANCHOR = 'anchor',
  MIGHT = 'might',
  HEX = 'hex',
  BLOCK = 'block',
  HEAL = 'heal'
}

export enum ATTACK_TYPE {
  RANGE = 'range',
  MELEE = 'melee',
  SPLASH = 'splash',
  SUPPORT = 'support'
}

export enum SUPPORT_TYPE {
  HEAL = 'heal'
}

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
  mountainWarrior5({
    id: 3,
    team: 'attackers',
    position: 5
  }),
  mountainWarrior4({
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
  goblin2({
    id: 102,
    position: 2,
    team: 'defenders'
  }),
  goblin3({
    id: 103,
    position: 3,
    team: 'defenders'
  })
];

export const ATTACKERS = ATTACKERS_TROOPS;
export const DEFENDERS = DEFENDERS_TROOPS;

export const AREA_CONTAINER_ID = 'area-container';
