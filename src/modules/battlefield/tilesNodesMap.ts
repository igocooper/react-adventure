import type { Trooper } from 'modules/battlefield/types';

export const TilesNodesMap = new Map<Trooper['id'], HTMLDivElement>();

export const registerTileNode = (id: Trooper['id'], node: HTMLDivElement) => {
  TilesNodesMap.set(id, node);
};

export const getTileNode = (id: Trooper['id']) => {
  return TilesNodesMap.get(id);
};
