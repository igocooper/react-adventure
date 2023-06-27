import type { Trooper } from 'modules/battlefield/types';

interface AnimationInstance {
  attack: () => Promise<void>;
  meleeAttack: (props: {
    characterBounds: DOMRect;
    targetBounds: DOMRect;
    tileNode: HTMLDivElement;
  }) => Promise<void>;
  meleeGoBack: (props: { tileNode: HTMLDivElement }) => Promise<void>;
  hurt: () => Promise<void>;
  die: () => Promise<void>;
  idle: () => void;
  shoot: () => void;
  images: Record<string, HTMLImageElement>;
  getImage: () => string | undefined;
}

export const TroopersAnimationInstances = new Map<
  Trooper['id'],
  AnimationInstance
>();

export function register(id: Trooper['id'], classInstance: AnimationInstance) {
  TroopersAnimationInstances.set(id, classInstance);
}

export const getTrooperAnimationInstance = (id: Trooper['id']) => {
  return TroopersAnimationInstances.get(id);
};
