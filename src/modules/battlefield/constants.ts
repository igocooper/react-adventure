import type { Trooper, Team } from './types';

export enum CURSOR {
  DEFAULT = 'default',
  BOW = 'bow',
  DISABLED = 'disabled',
  SCROLL = 'scroll',
  SWORD = 'sword'
}

export enum ATTACK_TYPE {
  RANGE = 'range',
  MELEE = 'melee',
  SPLASH = 'splash'
}

export enum HOVERED_ELEMENT_TYPE {
  DEFAULT = 'default',
  CHARACTER = 'character'
}

const DEFAULT_TROOPS: Trooper[] = [
  {
    team: 'attackers',
    type: 'knight',
    attack: '10-15',
    attackType: 'melee',
    position: 1,
    health: 50,
    currentHealth: 50,
    id: 1,
    initiative: 5
  },
  {
    team: 'attackers',
    type: 'knight',
    attack: '8-10',
    attackType: 'melee',
    position: 2,
    health: 60,
    currentHealth: 60,
    id: 2,
    initiative: 2
  },
  {
    team: 'attackers',
    type: 'spear-knight',
    attack: '15-22',
    attackType: 'melee',
    position: 3,
    health: 100,
    currentHealth: 100,
    id: 3,
    initiative: 3
  },
  {
    team: 'attackers',
    type: 'ice-mage',
    attack: '50-60',
    attackType: 'splash',
    position: 4,
    health: 30,
    currentHealth: 30,
    id: 4,
    initiative: 8
  },
  {
    team: 'attackers',
    type: 'archer',
    attack: '50-70',
    attackType: 'range',
    position: 5,
    health: 30,
    currentHealth: 30,
    id: 5,
    initiative: 9
  }
  // {
  //   team: "attackers",
  //   type: "archer",
  //   attack: '50-70',
  //   attackType: 'single',
  //   attackId: ARCHER_ATTACK,
  //   position: 6,
  //   health: 40,
  //   currentHealth: 40,
  //   id: 6,
  //   initiative: 9,
  // }
];

export const ATTACKERS = DEFAULT_TROOPS;
export const DEFENDERS = DEFAULT_TROOPS.map((troop) => ({
  ...troop,
  team: 'defenders' as Team,
  id: troop.id + 100
}));
