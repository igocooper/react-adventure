import type { Trooper } from 'modules/battlefield/types';
import type { CharacterAnimation } from './containers/CharacterAnimation';

export const TroopersAnimationInstances = new Map<
  Trooper['id'],
  CharacterAnimation
>();

export function register(id: Trooper['id'], classInstance: CharacterAnimation) {
  TroopersAnimationInstances.set(id, classInstance);
}

export const getTrooperAnimationInstance = (id: Trooper['id']) => {
  return TroopersAnimationInstances.get(id);
};
