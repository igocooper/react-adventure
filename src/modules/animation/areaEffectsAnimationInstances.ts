interface AnimationInstance {
  play: () => Promise<void>;
}

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
