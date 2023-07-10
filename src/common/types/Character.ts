import type { Trooper } from 'modules/battlefield/types';
import type { CallEffect } from 'redux-saga/effects';

export type AttackType = 'melee' | 'range' | 'splash';
export type Team = 'attackers' | 'defenders';
export type AbilityName = 'poison' | 'might' | 'anchor';

export type ApplyAbilityProps = {
  targetTrooper: Trooper;
};

export type Ability = {
  name: AbilityName;
  hitChance?: number;
  applyAbility: (props: ApplyAbilityProps) => void;
};

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
  baseDamage: string;
  attackType: AttackType;
  attackId?: string;
  criticalChance?: number;
  criticalMultiplier?: number;
  evadeChance?: number;
  defence: number;
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
