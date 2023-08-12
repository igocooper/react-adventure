import { swords } from './swords';
import { maces } from './maces';
import { axes } from './axes';
import { staffs } from './staffs';

export * from './swords';
export * from './staffs';
export * from './bows';
export * from './axes';
export * from './maces';

export const weapons = [...swords, ...maces, ...axes, ...staffs];
