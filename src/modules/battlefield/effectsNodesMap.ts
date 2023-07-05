import type { Trooper } from 'modules/battlefield/types';

export const EffectNodesMap = new Map<Trooper['id'], HTMLDivElement>();

export const registerEffectNode = (id: Trooper['id'], node: HTMLDivElement) => {
  EffectNodesMap.set(id, node);
};

export const getEffectNode = (id: Trooper['id']) => {
  return EffectNodesMap.get(id);
};
