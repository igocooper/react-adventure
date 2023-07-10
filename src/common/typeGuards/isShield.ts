import type { Shield, Weapon } from 'common/types';

export function isShield(weapon: Weapon | Shield): weapon is Shield {
  return (weapon as Shield).defence !== undefined;
}
