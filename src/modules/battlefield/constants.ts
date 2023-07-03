import type { Trooper } from './types';
import { createPoisonAbility } from './sagas/abilitiesSaga/abilities';

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
  BLOCK = 'block'
}

export enum ATTACK_TYPE {
  RANGE = 'range',
  MELEE = 'melee',
  SPLASH = 'splash'
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
  STRATEGIC = 'strategic'
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
  {
    team: 'attackers',
    type: 'mountain-warrior-1',
    damage: '10-15',
    criticalChance: 50,
    criticalMultiplier: 2,
    attackType: 'melee',
    position: 1,
    health: 50,
    currentHealth: 50,
    defence: 0,
    id: 1,
    initiative: 5,
    // AIType: AI_TYPE.DETERMINED
    abilities: [],
    effects: []
  },
  {
    team: 'attackers',
    type: 'torug',
    damage: '10-15',
    criticalChance: 50,
    criticalMultiplier: 2,
    attackType: 'melee',
    position: 2,
    health: 50,
    currentHealth: 50,
    defence: 0,
    id: 2,
    initiative: 15,
    abilities: [
      createPoisonAbility({
        duration: 1,
        damage: 15,
        hitChance: 100
      })
    ],
    // AIType: AI_TYPE.DETERMINED
    effects: []
  },
  {
    team: 'attackers',
    type: 'mountain-warrior-5',
    damage: '10-15',
    criticalChance: 50,
    criticalMultiplier: 2,
    attackType: 'range',
    attackId: 'mountainArcherArrow',
    position: 3,
    health: 100,
    currentHealth: 100,
    defence: 0,
    id: 3,
    initiative: 3,
    abilities: [],
    // AIType: AI_TYPE.DETERMINED
    effects: []
  }
  // {
  //   team: 'attackers',
  //   type: 'mountain-warrior-1',
  //   damage: '50-60',
  //   attackType: 'melee',
  //   position: 4,
  //   health: 30,
  //   currentHealth: 30,
  //   id: 4,
  //   initiative: 8
  // },
  // {
  //   team: 'attackers',
  //   type: 'mountain-warrior-4',
  //   damage: '50-70',
  //   attackType: 'melee',
  //   position: 5,
  //   health: 30,
  //   currentHealth: 30,
  //   id: 5,
  //   initiative: 9
  // },
  // {
  //   team: 'attackers',
  //   type: 'mountain-warrior-2',
  //   damage: '50-70',
  //   attackType: 'range',
  //   position: 6,
  //   health: 30,
  //   currentHealth: 30,
  //   id: 6,
  //   initiative: 9
  // }
];

const DEFENDERS_TROOPS: Trooper[] = [
  {
    team: 'defenders',
    type: 'mountain-warrior-5',
    damage: '10-15',
    evadeChance: 25,
    attackType: 'range',
    attackId: 'mountainArcherArrow',
    position: 1,
    health: 100,
    currentHealth: 100,
    defence: 0,
    id: 101,
    initiative: 13,
    abilities: [],
    AIType: AI_TYPE.STRATEGIC,
    effects: []
  },
  {
    team: 'defenders',
    type: 'goblin-1',
    damage: '10-15',
    evadeChance: 25,
    attackType: 'melee',
    position: 2,
    health: 50,
    currentHealth: 50,
    defence: 0,
    id: 102,
    initiative: 25,
    abilities: [],
    AIType: AI_TYPE.STRATEGIC,
    effects: []
  },
  {
    team: 'defenders',
    type: 'goblin-2',
    damage: '10-15',
    evadeChance: 25,
    attackType: 'melee',
    position: 3,
    health: 50,
    currentHealth: 50,
    defence: 0,
    id: 103,
    initiative: 22,
    abilities: [
      createPoisonAbility({
        duration: 1,
        damage: 25,
        hitChance: 100
      })
    ],
    // AIType: AI_TYPE.STRATEGIC,
    effects: []
  }
  // {
  //   team: 'defenders',
  //   type: 'goblin-3',
  //   damage: '15-22',
  //   attackType: 'melee',
  //   position: 4,
  //   health: 100,
  //   currentHealth: 100,
  //   id: 13,
  //   initiative: 3
  // },
  // {
  //   team: 'defenders',
  //   type: 'goblin-3',
  //   damage: '15-22',
  //   attackType: 'melee',
  //   position: 5,
  //   health: 100,
  //   currentHealth: 100,
  //   id: 14,
  //   initiative: 3
  // },
  // {
  //   team: 'defenders',
  //   type: 'goblin-3',
  //   damage: '15-22',
  //   attackType: 'melee',
  //   position: 6,
  //   health: 100,
  //   currentHealth: 100,
  //   id: 15,
  //   initiative: 3
  // }
];

export const ATTACKERS = ATTACKERS_TROOPS;
export const DEFENDERS = DEFENDERS_TROOPS;
