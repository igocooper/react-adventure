export type AttackType = 'melee' | 'range' | 'splash';
export type Team = 'attackers' | 'defenders';
export type Cursor = 'default' | 'bow' | 'disabled' | 'wand' | 'sword';
export type HoveredElementType = 'default' | 'character';
export type bloodItemSlot = 'Body Blood.png' | 'Body Cut.png' | 'Face Blood.png' | 'Face Cut.png';
export type EffectName = 'poison' | 'anchor' | 'might' | 'hex';

export type ApplyEffectProps = {
  activeTrooper: Trooper;
}

export type Effect = {
  name: EffectName;
  duration: number;
  once?: boolean;
  done: boolean;
  applyEffect: (props: ApplyEffectProps) => void;
  cancelEffect?: (props: ApplyEffectProps) => void;
  iconSrc: string;
}

export type Character = {
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
  effects: Effect[];
};

declare global {
  type Nullable<T> = T | null;
}
