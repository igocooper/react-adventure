import { getRandomNumberInRange } from './getRandomNumberInRange';

export const generateId = () =>
  Date.now() + getRandomNumberInRange(1, 10000000);
