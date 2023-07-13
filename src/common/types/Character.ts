import type { Trooper } from 'modules/battlefield/types';
import type { CallEffect } from 'redux-saga/effects';

export type AttackType = 'melee' | 'range' | 'splash';
export type DamageType = 'physical' | 'fire' | 'water' | 'poison';
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
  criticalMultiplier?: number;
  evadeChance?: number;
  defence: number;
  poisonResistance?: number;
  waterResistance?: number;
  fireResistance?: number;
  appearance?: Appearance;
  equipment: Equipment;
  abilities: Ability[];
  effects: Effect[];
};

export type Armor = {
  name: string;
  defence: number;
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
  defence: number;
};

export type Weapon = {
  name: string;
  imageSrc: string;
  damage: string;
  power?: number;
  criticalChance?: number;
  criticalMultiplier?: number;
  attackType: AttackType;
  abilities?: [Ability];
};

export type Shield = {
  name: string;
  defence: number;
  imageSrc: string;
};

export type Equipment = {
  helmet?: Helmet;
  armor?: Armor;
  leftHand?: Weapon;
  rightHand?: Weapon | Shield;
};
