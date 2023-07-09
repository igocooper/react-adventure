import type { Coordinates } from 'modules/battlefield/types';

type AnimationInstance = {
  play: (props?: Coordinates) => Promise<void>;
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
