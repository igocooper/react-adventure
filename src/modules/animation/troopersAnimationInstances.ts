import type { Trooper } from 'modules/battlefield/types';
import { itemSlots } from 'common/constants';

const { BODY_BLOOD, BODY_CUT, FACE_BLOOD, FACE_CUT } = itemSlots;

export type AnimationInstance = {
  attack: () => Promise<void>;
  meleeAttack: (props: {
    characterBounds: DOMRect;
    targetBounds: DOMRect;
    tileNode: HTMLDivElement;
  }) => Promise<void>;
  meleeGoBack: (props: { tileNode: HTMLDivElement }) => Promise<void>;
  hurt: () => Promise<void>;
  die: () => Promise<void>;
  cast: () => Promise<void>;
  idle: () => void;
  shoot: () => void;
  effected: () => Promise<void>;
  images: Record<string, HTMLImageElement>;
  getImage: () => string | undefined;
  bloodSlots: {
    [BODY_BLOOD]: boolean;
    [BODY_CUT]: boolean;
    [FACE_BLOOD]: boolean;
    [FACE_CUT]: boolean;
  };
};

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
