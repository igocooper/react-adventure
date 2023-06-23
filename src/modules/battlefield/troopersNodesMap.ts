import type { Trooper } from 'modules/battlefield/types';

export const TroopersNodesMap = new Map<
  Trooper['id'],
  HTMLCanvasElement
>();

export function registerTrooperNode(id: Trooper['id'], node: HTMLCanvasElement) {
  TroopersNodesMap.set(id, node);
}

export const getTrooperNode = (id: Trooper['id']) => {
  return TroopersNodesMap.get(id);
};
