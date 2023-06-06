export type AttackType = 'melee' | 'range' | 'splash';
export type Team = 'attackers' | 'defenders';

export interface Character {
  team: Team;
  type: string;
  attack: string;
  attackType: AttackType;
  position: number;
  health: number;
  currentHealth: number;
  id: number;
  initiative: number;
}

export type Troop = Character;
