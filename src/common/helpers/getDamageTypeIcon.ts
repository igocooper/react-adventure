import type { DamageType } from 'common/types';
import { DAMAGE_TYPE } from 'common/constants';

export const getDamageTypeIcon = (damageType: DamageType) => {
  switch (damageType) {
    case DAMAGE_TYPE.FIRE: {
      return '🔥';
    }

    case DAMAGE_TYPE.WATER: {
      return '💧';
    }

    case DAMAGE_TYPE.EARTH: {
      return '🍃';
    }

    case DAMAGE_TYPE.WIND: {
      return '🌪';
    }

    case DAMAGE_TYPE.LIGHT: {
      return '🌕';
    }

    case DAMAGE_TYPE.DARK: {
      return '🌑';
    }

    case DAMAGE_TYPE.POISON: {
      return '☠️';
    }

    case DAMAGE_TYPE.BLOOD: {
      return '🩸️';
    }
  }

  return '💩';
};
