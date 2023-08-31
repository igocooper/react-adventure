import type { Coordinates } from 'modules/battlefield/types';
import type { WeaponType } from 'common/types';

type Weapon = {
  src: string;
  type: WeaponType;
};

type DissarmedEquipment = {
  leftHand?: Weapon;
  rightHand?: Weapon;
  bow?: Weapon;
};

type AnimationInstance = {
  play: (props?: Coordinates | number) => Promise<void>;
  remove?: (id: number) => void;
  add?: (id: number, equipment: DissarmedEquipment) => void;
};

export const AreaEffectsAnimationInstances = new Map<
  string,
  AnimationInstance
>();

export function registerAreaEffect(
  id: string,
  classInstance: AnimationInstance
) {
  AreaEffectsAnimationInstances.set(id, classInstance);
}

export const getAreaEffectAnimationInstance = (id: string) => {
  return AreaEffectsAnimationInstances.get(id);
};
