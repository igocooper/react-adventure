import type { Trooper } from './types';

export enum CURSOR {
  DEFAULT = 'default',
  BOW = 'bow',
  DISABLED = 'disabled',
  WAND = 'wand',
  SWORD = 'sword'
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

const ATTACKERS_TROOPS: Trooper[] = [
  // {
  //   team: 'attackers',
  //   type: 'mountain-warrior-1',
  //   damage: '10-15',
  //   attackType: 'melee',
  //   position: 1,
  //   health: 50,
  //   currentHealth: 50,
  //   id: 1,
  //   initiative: 5
  // },
  // {
  //   team: 'attackers',
  //   type: 'torug',
  //   damage: '6-10',
  //   attackType: 'melee',
  //   position: 2,
  //   health: 60,
  //   currentHealth: 60,
  //   id: 2,
  //   initiative: 2
  // },
  {
    team: 'attackers',
    type: 'mountain-warrior-5',
    damage: '15-22',
    attackType: 'range',
    position: 2,
    health: 100,
    currentHealth: 100,
    id: 3,
    initiative: 3
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
    damage: '15-22',
    attackType: 'range',
    position: 2,
    health: 100,
    currentHealth: 100,
    id: 103,
    initiative: 3
  }
  // {
  //   team: 'defenders',
  //   type: 'goblin-1',
  //   damage: '10-15',
  //   attackType: 'melee',
  //   position: 1,
  //   health: 50,
  //   currentHealth: 50,
  //   id: 11,
  //   initiative: 5
  // },
  // {
  //   team: 'defenders',
  //   type: 'goblin-2',
  //   damage: '6-10',
  //   attackType: 'melee',
  //   position: 2,
  //   health: 60,
  //   currentHealth: 60,
  //   id: 12,
  //   initiative: 2
  // },
  // {
  //   team: 'defenders',
  //   type: 'goblin-3',
  //   damage: '15-22',
  //   attackType: 'melee',
  //   position: 3,
  //   health: 100,
  //   currentHealth: 100,
  //   id: 13,
  //   initiative: 3
  // }
];

export const ATTACKERS = ATTACKERS_TROOPS;
export const DEFENDERS = DEFENDERS_TROOPS;
