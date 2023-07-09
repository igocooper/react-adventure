import type { Trooper } from 'modules/battlefield/types';

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
  team: Team;
  type: string;
  damage: string;
  attackType: AttackType;
  attackId?: string;
  position: number;
  health: number;
  id: number;
  initiative: number;
  appearance?: Appearance;
  equipment: Equipment;
  abilities: Ability[];
  defence: number;
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
