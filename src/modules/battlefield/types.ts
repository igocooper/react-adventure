import type { CallEffect } from 'redux-saga/effects';
import type { Character } from 'common/types';

export type {
  Ability,
  ApplyAbilityProps,
  Team,
  AttackType
} from 'common/types';

export type Cursor = 'default' | 'bow' | 'disabled' | 'wand' | 'sword';

export type HoveredElementType = 'default' | 'character';

export type bloodItemSlot =
  | 'Body Blood.png'
  | 'Body Cut.png'
  | 'Face Blood.png'
  | 'Face Cut.png';

export type LocationName =
  | 'forest-road'
  | 'castle-dungeon'
  | 'castle-throne-hall'
  | 'castle-courtyard'
  | 'castle-hall'
  | 'dragon-dungeon-lair'
  | 'dragon-dungeon-treasure'
  | 'dragon-dungeon-entrance'
  | 'dragon-dungeon-lava'
  | 'lava-arena'
  | 'ice-arena'
  | 'forest-arena'
  | 'graveyard-arena'
  | 'goblin-village-outpost'
  | 'goblin-village-throne-hall'
  | 'goblin-village-bridge'
  | 'goblin-village-entrance'
  | 'cave'
  | 'cave-spiders'
  | 'cave-lava'
  | 'cave-crystals'
  | 'forest'
  | 'elven-forest'
  | 'fores-2'
  | 'forest-3';

export type EffectName = 'poison' | 'anchor' | 'might' | 'hex' | 'block';

export type ApplyEffectProps = {
  activeTrooper: Trooper;
};

type ApplyDelayedEffect = (
  props: ApplyEffectProps
) => () => Generator<CallEffect<void>, void, ApplyEffectProps>;

type ApplyEffect = (props: ApplyEffectProps) => void;

export type Effect = {
  name: EffectName;
  duration: number;
  once?: boolean;
  done: boolean;
  applyEffect: ApplyEffect | ApplyDelayedEffect;
  cancelEffect?: (props: ApplyEffectProps) => void;
  iconSrc: string;
};

export type Trooper = Character & {
  currentHealth: number;
  AIType?: string;
  currentTargetId?: number;
  criticalChance?: number;
  criticalMultiplier?: number;
  evadeChance?: number;
  effects: Effect[];
  hasWaited?: boolean;
};

export type Coordinate = {
  x: number;
  y: number;
};

export type Coordinates = Coordinate[];

declare global {
  type Nullable<T> = T | null;
}
