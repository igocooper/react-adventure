export type AttackType = 'melee' | 'range' | 'splash';
export type Team = 'attackers' | 'defenders';
export type Cursor = 'default' | 'bow' | 'disabled' | 'wand' | 'sword';
export type HoveredElementType = 'default' | 'character';
export type bloodItemSlot = 'Body Blood.png' | 'Body Cut.png' | 'Face Blood.png' | 'Face Cut.png';

export interface Character {
  team: Team;
  type: string;
  damage: string;
  attackType: AttackType;
  attackId?: string;
  position: number;
  health: number;
  id: number;
  initiative: number;
}

export type Trooper = Character & {
  currentHealth: number;
  AIType?: string;
  currentTargetId?: number;
  criticalChance?: number;
  criticalMultiplier?: number;
  evadeChance?: number;
};

declare global {
  type Nullable<T> = T | null;
}
