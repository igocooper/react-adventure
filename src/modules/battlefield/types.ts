import type { Character, Resistance, Team } from 'common/types';
import type { CURSOR } from 'common/constants';

export type {
  Ability,
  ApplyAbilityProps,
  Team,
  AttackType,
  Effect,
  EffectName
} from 'common/types';

export type Cursor = `${CURSOR}`;

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

export type Trooper = Character & {
  id: number;
  team: Team;
  position: number;
  AIType?: string;
  currentTargetId?: number;
  hasWaited?: boolean;
  castSFX?: HTMLAudioElement;
  baseWeaponDamage?: string;
  baseHealth?: number;
  baseDefence?: number;
  baseResistance?: Resistance;
};

export type Coordinate = {
  x: number;
  y: number;
};

export type Coordinates = Coordinate[];

declare global {
  type Nullable<T> = T | null;
}
