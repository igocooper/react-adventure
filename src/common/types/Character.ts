import type { Trooper } from 'modules/battlefield/types';
import type { CallEffect } from 'redux-saga/effects';
export type AttackType = 'melee' | 'range' | 'splash';
export type DamageType =
  | 'physical'
  | 'fire'
  | 'water'
  | 'wind'
  | 'earth'
  | 'light'
  | 'dark'
  | 'blood'
  | 'poison';
export type SupportType = 'heal' | 'buff';
export type Team = 'attackers' | 'defenders';
export type AbilityName = 'poison' | 'might' | 'anchor' | 'heal';
export type AbilityType = 'curse' | 'buff';

export type ApplyAbilityProps = {
  targetTrooper: Trooper;
};

export type Ability = {
  name: AbilityName;
  type: AbilityType;
  hitChance?: number;
  applyAbility: (props: ApplyAbilityProps) => void;
};

export type EffectName =
  | 'poison'
  | 'anchor'
  | 'might'
  | 'hex'
  | 'block'
  | 'heal';

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

export type Appearance = {
  head: string;
  headHair: string;
  headBeard: string;
  face01: string;
  face02: string;
  face03: string;
  headEarless: string;
};

export type Resistance = {
  fire?: number;
  water?: number;
  earth?: number;
  wind?: number;
  light?: number;
  dark?: number;
  poison?: number;
  blood?: number;
};

export type Character = {
  type: string;
  health: number;
  currentHealth: number;
  initiative: number;
  damage: string;
  damageType: DamageType;
  baseDamage: string;
  attackType: AttackType;
  supportType?: SupportType;
  power?: number;
  attackId?: string;
  hitChance: number;
  criticalChance?: number;
  counterAttackChance?: number;
  criticalMultiplier?: number;
  evadeChance?: number;
  defence: number;
  resistance?: Resistance;
  appearance?: Appearance;
  equipment: Equipment;
  abilities: Ability[];
  effects: Effect[];
};

export type ArmorStats = {
  defence: number;
  resistance?: Resistance;
  evadeChance?: number;
  criticalChance?: number;
  counterAttackChance?: number;
};

export type WeaponStats = {
  damage: string;
  hitChance?: number;
  power?: number;
  criticalChance?: number;
  criticalMultiplier?: number;
  counterAttackChance?: number;
  abilities?: [Ability];
};

export type Armor = {
  name: string;
  stats: ArmorStats;
  imageUrls: {
    body: string;
    leftArm: string;
    leftHand: string;
    leftLeg: string;
    rightArm: string;
    rightHand: string;
    rightLeg: string;
  };
};

export type HelmetType = 'full-face' | 'large' | 'medium' | 'small';

export type Helmet = {
  name: string;
  type: HelmetType;
  large?: boolean;
  imageSrc: string;
  stats: ArmorStats;
};

export type Bow = {
  name: string;
  imageUrls: {
    bow: string;
    bowString: string;
    drawnBowString: string;
    quiver: string;
    arrow: string;
  };
  stats: WeaponStats;
};

export type Weapon = {
  name: string;
  imageSrc: string;
  stats: WeaponStats;
};

export type Shield = {
  name: string;
  stats: ArmorStats;
  imageSrc: string;
};

export type Equipment = {
  helmet?: Helmet;
  armor?: Armor;
  leftHand?: Weapon;
  rightHand?: Weapon;
  shield?: Shield;
  bow?: Bow;
};
