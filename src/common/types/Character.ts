import type { Trooper } from 'modules/battlefield/types';
import type { CallEffect } from 'redux-saga/effects';
import type {
  EFFECT,
  ABILITY,
  SKILL,
  ATTACK_TYPE,
  ABILITY_TYPE,
  EFFECT_TYPE,
  DAMAGE_TYPE,
  HELMET_TYPE,
  WEAPON_TYPE,
  SEX,
  TARGET
} from '../constants';

// UNION types generation inspired by this article https://bobbyhadz.com/blog/typescript-convert-enum-to-union
export type Team = 'attackers' | 'defenders';
export type AttackType = `${ATTACK_TYPE}`;
export type DamageType = `${DAMAGE_TYPE}`;
export type AbilityName = `${ABILITY}`;
export type AbilityType = `${ABILITY_TYPE}`;
export type EffectType = `${EFFECT_TYPE}`;
export type EffectName = `${EFFECT}`;
export type HelmetType = `${HELMET_TYPE}`;
export type WeaponType = `${WEAPON_TYPE}`;
export type SkillName = `${SKILL}`;
export type Sex = `${SEX}`;
export type SkillTarget = `${TARGET}`;

export type ApplyAbilityProps = {
  targetTrooperId: Trooper['id'];
};

export type Ability = {
  name: AbilityName;
  type: AbilityType;
  description: string;
  hitChance?: number;
  applyAbility: (props: ApplyAbilityProps) => void;
  iconSrc: string;
};

type ApplyDelayedEffect = () => () => Generator<CallEffect<void>, void, void>;

type ApplyEffect = () => void;

export type Effect = {
  id: number;
  name: EffectName;
  type: EffectType;
  description: string;
  stackInfo?: (duration: number) => string; // used to display info about stacked effects
  duration: number;
  once?: boolean;
  stacks?: boolean; // allows effect to be applied multiple times to single trooper
  done: boolean;
  applyEffect: ApplyEffect | ApplyDelayedEffect;
  cancelEffect?: () => void;
  iconSrc: string;
};

export type ApplySkillProps = {
  targetTrooperId: Trooper['id'];
};

type ApplySkill = (props: ApplySkillProps) => void;

export type Skill = {
  name: SkillName;
  target: SkillTarget;
  attackType?: ATTACK_TYPE;
  damageType?: DAMAGE_TYPE;
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
  resistance: Resistance;
  appearance?: Appearance;
  equipment: Equipment;
  abilities: Ability[];
  skills: Skills;
  sex: Sex;
  effects: Effect[];
  castSFX?: HTMLAudioElement;
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
  type: WeaponType;
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
