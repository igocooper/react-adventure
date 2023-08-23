import type { Trooper } from '../types';

export const addBaseTrooperProperties = (troopers: Trooper[]): Trooper[] => {
  return troopers.map((trooper) => {
    return {
      ...trooper,
      baseWeaponDamage: trooper.damage,
      baseDefence: trooper.defence,
      baseHealth: trooper.health,
      baseResistance: { ...trooper.resistance }
    };
  });
};
