import { mages } from './mages';

export { createCharacter } from './createCharacter';
import { goblins } from './goblins';
import { hero } from './hero';
import { paladins } from './paladins';
import { priests } from './priests';
import { mountainWarriors } from './mountain-warriors';

export * from './hero';
export * from './priests';
export * from './goblins';
export * from './mountain-warriors';
export * from './mages';
export * from './paladins';

export const characters = [
  hero,
  ...paladins,
  ...goblins,
  ...priests,
  ...mages,
  ...mountainWarriors
];
