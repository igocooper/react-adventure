export type AttackType = 'melee' | 'range' | 'splash';
export type Team = 'attackers' | 'defenders';
export type Cursor = 'default' | 'bow' | 'disabled' | 'scroll' | 'sword';
export type HoveredElementType = 'default' | 'character';

export interface Character {
  team: Team;
  type: string;
  attack: string;
  attackType: AttackType;
  position: number;
  health: number;
  id: number;
  initiative: number;
}

export type Trooper = Character & {
  currentHealth: number;
};

declare global {
  type Nullable<T> = T | null;
}
