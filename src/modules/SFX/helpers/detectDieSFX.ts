import SFX from 'modules/SFX';
import type { Sex } from 'common/types';
import { SEX } from 'common/constants';

export const detectDieSFX = (sex: Sex) => {
  console.log('sex', sex);
  if (sex === SEX.FEMALE) {
    return SFX.femaleDie;
  }

  return SFX.maleDie;
};
