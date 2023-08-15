import type { Trooper } from 'modules/battlefield/types';
import type { CallEffect } from 'redux-saga/effects';
import type {
  EFFECT,
  ABILITY,
  SKILL,
  ATTACK_TYPE,
  ABILITY_TYPE,
  DAMAGE_TYPE,
  HELMET_TYPE,
  TARGET
} from '../constants';

// UNION types generation inspired by this article https://bobbyhadz.com/blog/typescript-convert-enum-to-union
export type Team = 'attackers' | 'defenders';
export type AttackType = `${ATTACK_TYPE}`;
export type DamageType = `${DAMAGE_TYPE}`;
export type AbilityName = `${ABILITY}`;
export type AbilityType = `${ABILITY_TYPE}`;
export type EffectName = `${EFFECT}`;
export type HelmetType = `${HELMET_TYPE}`;
export type SkillName = `${SKILL}`;
export type SkillTarget = `${TARGET}`;

export type ApplyAbilityProps = {
  targetTrooper: Trooper;
};

export type Ability = {
  name: AbilityName;
  type: AbilityType;
  description: string;
  hitChance?: number;
  applyAbility: (props: ApplyAbilityProps) => void;
  iconSrc: string;
};

export type ApplyEffectProps = {
  activeTrooper: Trooper;
};

type ApplyDelayedEffect = (
  props: ApplyEffectProps
) => () => Generator<CallEffect<void>, void, ApplyEffectProps>;

type ApplyEffect = (props: ApplyEffectProps) => void;

export type Effect = {
  name: EffectName;
  description: string;
  duration: number;
  once?: boolean;
  done: boolean;
  applyEffect: ApplyEffect | ApplyDelayedEffect;
  cancelEffect?: (props: ApplyEffectProps) => void;
  iconSrc: string;
};

export type ApplySkillProps = {
  targetTrooper: Trooper;
};

type ApplySkill = (props: ApplySkillProps) => void;

export type Skill = {
  name: SkillName;
  target: SkillTarget;
  attackType?: ATTACK_TYPE;
  description: string;
  coolDown: number;
  currentCoolDown?: number;
  applySkill: ApplySkill;
  iconSrc: string;
};

export type Skills = Record<string, Skill>;

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
  healPower?: number;
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
  skills: Skills;
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
  healPower?: number;
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
    bowStem: string;
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
