import { CHARACTER_IMAGE_SLOT } from 'common/constants';
import type { Appearance, Equipment } from 'common/types';
import { applyEquipment } from 'common/helpers/equipment';

const getSconFile = (type: string) => {
  switch (type) {
    default:
      return '/common.scon';
  }
};

type AppearanceUrls = Record<string, string>;

const getDefaultAppearance = (type: string): AppearanceUrls => {
  return {
    [CHARACTER_IMAGE_SLOT.BODY]: `/images/${type}/Body.png`,
    [CHARACTER_IMAGE_SLOT.FACE_01]: `/images/${type}/Face 01.png`,
    [CHARACTER_IMAGE_SLOT.FACE_02]: `/images/${type}/Face 02.png`,
    [CHARACTER_IMAGE_SLOT.FACE_03]: `/images/${type}/Face 03.png`,
    [CHARACTER_IMAGE_SLOT.HEAD]: `/images/${type}/Head.png`,
    [CHARACTER_IMAGE_SLOT.LEFT_ARM]: `/images/${type}/Left Arm.png`,
    [CHARACTER_IMAGE_SLOT.LEFT_HAND]: `/images/${type}/Left Hand.png`,
    [CHARACTER_IMAGE_SLOT.LEFT_LEG]: `/images/${type}/Left Leg.png`,
    [CHARACTER_IMAGE_SLOT.RIGHT_ARM]: `/images/${type}/Right Arm.png`,
    [CHARACTER_IMAGE_SLOT.RIGHT_HAND]: `/images/${type}/Right Hand.png`,
    [CHARACTER_IMAGE_SLOT.RIGHT_LEG]: `/images/${type}/Right Leg.png`,
    [CHARACTER_IMAGE_SLOT.SLASH_FX]: `/images/${type}/SlashFX.png`,
    [CHARACTER_IMAGE_SLOT.LEFT_HAND_WEAPON]: `/images/${type}/Left Hand Weapon.png`,
    // Archer images
    ...(type.includes('archer')
      ? {
          [CHARACTER_IMAGE_SLOT.BOW]: `/images/${type}/Bow.png`,
          [CHARACTER_IMAGE_SLOT.BOWSTRING]: `/images/${type}/Bowstring.png`,
          [CHARACTER_IMAGE_SLOT.DRAWN_BOWSTRING]: `/images/${type}/Drawn Bowstring.png`,
          [CHARACTER_IMAGE_SLOT.ARROW]: `/images/${type}/Arrow.png`,
          [CHARACTER_IMAGE_SLOT.QUIVER]: `/images/${type}/Quiver.png`
        }
      : {}),
    // Hero
    ...(type === 'hero'
      ? {
          [CHARACTER_IMAGE_SLOT.HEAD_HAIR]: `/images/${type}/Head Hair.png`,
          [CHARACTER_IMAGE_SLOT.HEAD_BEARD]: `/images/${type}/Head Beard.png`
        }
      : {})
  };
};

const applyCharacterAppearance = (
  appearance: AppearanceUrls,
  characterAppearance: Appearance
) => {
  return {
    ...appearance,
    [CHARACTER_IMAGE_SLOT.FACE_01]: characterAppearance.face01,
    [CHARACTER_IMAGE_SLOT.FACE_02]: characterAppearance.face02,
    [CHARACTER_IMAGE_SLOT.FACE_03]: characterAppearance.face03,
    [CHARACTER_IMAGE_SLOT.HEAD_BEARD]: characterAppearance.headBeard,
    [CHARACTER_IMAGE_SLOT.HEAD]: characterAppearance.head,
    [CHARACTER_IMAGE_SLOT.HEAD_HAIR]: characterAppearance.headHair
  };
};

const getAppearance = (props: Props): AppearanceUrls => {
  const { type, appearance: characterAppearance, equipment } = props;
  let appearance = getDefaultAppearance(type);

  if (characterAppearance) {
    appearance = applyCharacterAppearance(appearance, characterAppearance);
  }

  return applyEquipment({
    equipment,
    appearance,
    characterAppearance: characterAppearance!
  });
};

type ReturnType = {
  imagesUrls: Record<string, string>;
  sconFileUrl: string;
};

type Props = {
  type: string;
  equipment: Equipment;
  appearance?: Appearance;
};

export const getCharacterProps = (props: Props): ReturnType => {
  const { type } = props;

  return {
    imagesUrls: getAppearance(props),
    sconFileUrl: getSconFile(type)
  };
};
