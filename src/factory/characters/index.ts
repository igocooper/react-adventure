import { mages } from './mages';
import { goblins } from './goblins';
import { hero } from './hero';
import { paladins } from './paladins';
import { priests } from './priests';
import { mountainWarriors } from './mountain-warriors';

export { createCharacter } from './createCharacter';
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
