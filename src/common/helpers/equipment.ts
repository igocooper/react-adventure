import type {
  Appearance,
  Armor,
  Equipment,
  Helmet,
  Shield,
  Weapon
} from '../types';
import { CHARACTER_IMAGE_SLOT, HELMET_TYPE } from '../constants';

type AppearanceUrls = Record<string, string>;

export const equipHelmet = ({
  appearance,
  helmet,
  characterAppearance
}: {
  helmet: Helmet;
  appearance: AppearanceUrls;
  characterAppearance: Appearance;
}): AppearanceUrls => {
  const result = {
    ...appearance
  };

  const helmetSlot = helmet.large
    ? CHARACTER_IMAGE_SLOT.HEAD_ARMOR_HIGH
    : CHARACTER_IMAGE_SLOT.HEAD_ARMOR;
  const removeHelmetSlot = helmet.large
    ? CHARACTER_IMAGE_SLOT.HEAD_ARMOR
    : CHARACTER_IMAGE_SLOT.HEAD_ARMOR_HIGH;

  switch (helmet.type) {
    case HELMET_TYPE.FULL_FACE: {
      delete result[CHARACTER_IMAGE_SLOT.FACE_01];
      delete result[CHARACTER_IMAGE_SLOT.FACE_02];
      delete result[CHARACTER_IMAGE_SLOT.FACE_03];
      delete result[CHARACTER_IMAGE_SLOT.HEAD];
      delete result[CHARACTER_IMAGE_SLOT.HEAD_HAIR];
      delete result[CHARACTER_IMAGE_SLOT.HEAD_BEARD];
      delete result[removeHelmetSlot];

      return {
        ...result,
        [helmetSlot]: helmet.imageSrc
      };
    }
    case HELMET_TYPE.LARGE: {
      delete result[removeHelmetSlot];
      delete result[CHARACTER_IMAGE_SLOT.HEAD_HAIR];

      return {
        ...result,
        [helmetSlot]: helmet.imageSrc,
        [CHARACTER_IMAGE_SLOT.FACE_01]: characterAppearance.face01,
        [CHARACTER_IMAGE_SLOT.FACE_02]: characterAppearance.face02,
        [CHARACTER_IMAGE_SLOT.FACE_03]: characterAppearance.face03,
        [CHARACTER_IMAGE_SLOT.HEAD_BEARD]: characterAppearance.headBeard,
        [CHARACTER_IMAGE_SLOT.HEAD]: characterAppearance.headEarless
      };
    }
    case HELMET_TYPE.MEDIUM: {
      delete result[removeHelmetSlot];
      delete result[CHARACTER_IMAGE_SLOT.HEAD_HAIR];

      return {
        ...result,
        [helmetSlot]: helmet.imageSrc,
        [CHARACTER_IMAGE_SLOT.FACE_01]: characterAppearance.face01,
        [CHARACTER_IMAGE_SLOT.FACE_02]: characterAppearance.face02,
        [CHARACTER_IMAGE_SLOT.FACE_03]: characterAppearance.face03,
        [CHARACTER_IMAGE_SLOT.HEAD_BEARD]: characterAppearance.headBeard,
        [CHARACTER_IMAGE_SLOT.HEAD]: characterAppearance.head
      };
    }
    case HELMET_TYPE.SMALL: {
      delete result[removeHelmetSlot];

      return {
        ...result,
        [helmetSlot]: helmet.imageSrc,
        [CHARACTER_IMAGE_SLOT.FACE_01]: characterAppearance.face01,
        [CHARACTER_IMAGE_SLOT.FACE_02]: characterAppearance.face02,
        [CHARACTER_IMAGE_SLOT.FACE_03]: characterAppearance.face03,
        [CHARACTER_IMAGE_SLOT.HEAD_BEARD]: characterAppearance.headBeard,
        [CHARACTER_IMAGE_SLOT.HEAD]: characterAppearance.head,
        [CHARACTER_IMAGE_SLOT.HEAD_HAIR]: characterAppearance.headHair
      };
    }

    default:
      return result;
  }
};

export const equipArmor = ({
  appearance,
  armor
}: {
  armor: Armor;
  appearance: AppearanceUrls;
}): AppearanceUrls => {
  return {
    ...appearance,
    [CHARACTER_IMAGE_SLOT.BODY]: armor.imageUrls.body,
    [CHARACTER_IMAGE_SLOT.LEFT_ARM]: armor.imageUrls.leftArm,
    [CHARACTER_IMAGE_SLOT.LEFT_HAND]: armor.imageUrls.leftHand,
    [CHARACTER_IMAGE_SLOT.LEFT_LEG]: armor.imageUrls.leftLeg,
    [CHARACTER_IMAGE_SLOT.RIGHT_ARM]: armor.imageUrls.rightArm,
    [CHARACTER_IMAGE_SLOT.RIGHT_HAND]: armor.imageUrls.rightHand,
    [CHARACTER_IMAGE_SLOT.RIGHT_LEG]: armor.imageUrls.rightLeg
  };
};

export const equipLeftHandWeapon = ({
  appearance,
  weapon
}: {
  weapon: Weapon;
  appearance: AppearanceUrls;
}): AppearanceUrls => {
  return {
    ...appearance,
    [CHARACTER_IMAGE_SLOT.LEFT_HAND_WEAPON]: weapon.imageSrc
  };
};

export const equipRightHandWeapon = ({
  appearance,
  weapon
}: {
  weapon: Weapon | Shield;
  appearance: AppearanceUrls;
}): AppearanceUrls => {
  return {
    ...appearance,
    [CHARACTER_IMAGE_SLOT.RIGHT_HAND_WEAPON]: weapon.imageSrc
  };
};

export const applyEquipment = ({
  equipment,
  appearance: appearanceBase,
  characterAppearance
}: {
  equipment: Equipment;
  appearance: AppearanceUrls;
  characterAppearance: Appearance;
}) => {
  let appearance = {
    ...appearanceBase
  };

  if (equipment.helmet) {
    appearance = equipHelmet({
      appearance,
      helmet: equipment.helmet,
      characterAppearance
    });
  }

  if (equipment.armor) {
    appearance = equipArmor({
      appearance,
      armor: equipment.armor
    });
  }

  if (equipment.leftHand) {
    appearance = equipLeftHandWeapon({
      appearance,
      weapon: equipment.leftHand
    });
  }

  if (equipment.rightHand) {
    appearance = equipRightHandWeapon({
      appearance,
      weapon: equipment.rightHand
    });
  }

  return appearance;
};
