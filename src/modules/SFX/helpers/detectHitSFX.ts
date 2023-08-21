import SFX from 'modules/SFX';
import type { Equipment, WeaponType } from 'common/types';
import { WEAPON_TYPE } from 'common/constants';

const detectSFXBasedOnType = (type: WeaponType) => {
  if (type === WEAPON_TYPE.WOODEN_STAFF) {
    return SFX.stickHit;
  }

  if (type === WEAPON_TYPE.MACE || type === WEAPON_TYPE.AXE) {
    return SFX.axeHit;
  }

  return SFX.swordHit;
};

export const detectHitSFX = (equipment: Equipment, hasMissed: boolean) => {
  if (hasMissed) {
    return SFX.miss;
  }

  if (!equipment.leftHand && equipment.rightHand) {
    const { type } = equipment.rightHand;

    return detectSFXBasedOnType(type);
  }

  if (equipment.leftHand) {
    const { type } = equipment.leftHand;

    return detectSFXBasedOnType(type);
  }

  return SFX.swordHit;
};
