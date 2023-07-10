import type { Shield, Weapon } from 'common/types';

export function isWeapon(weapon: Weapon | Shield): weapon is Weapon {
  return (weapon as Weapon).damage !== undefined;
}
