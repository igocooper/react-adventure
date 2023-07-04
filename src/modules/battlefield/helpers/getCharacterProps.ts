import { itemSlots } from 'common/constants';

const getUrls = (type: string) => {
  return {
    [itemSlots.BODY]: `/images/${type}/Body.png`,
    [itemSlots.FACE_01]: `/images/${type}/Face 01.png`,
    [itemSlots.FACE_02]: `/images/${type}/Face 02.png`,
    [itemSlots.FACE_03]: `/images/${type}/Face 03.png`,
    [itemSlots.HEAD]: `/images/${type}/Head.png`,
    [itemSlots.LEFT_ARM]: `/images/${type}/Left Arm.png`,
    [itemSlots.LEFT_HAND]: `/images/${type}/Left Hand.png`,
    [itemSlots.LEFT_LEG]: `/images/${type}/Left Leg.png`,
    [itemSlots.RIGHT_ARM]: `/images/${type}/Right Arm.png`,
    [itemSlots.RIGHT_HAND]: `/images/${type}/Right Hand.png`,
    [itemSlots.RIGHT_LEG]: `/images/${type}/Right Leg.png`,
    [itemSlots.SLASH_FX]: `/images/${type}/SlashFX.png`,
    [itemSlots.LEFT_HAND_WEAPON]: `/images/${type}/Left Hand Weapon.png`,
    [itemSlots.RIGHT_HAND_WEAPON]: `/images/${type}/Right Hand Weapon.png`,
    // Archer images
    [itemSlots.BOW]: `/images/${type}/Bow.png`,
    [itemSlots.BOWSTRING]: `/images/${type}/Bowstring.png`,
    [itemSlots.DRAWN_BOWSTRING]: `/images/${type}/Drawn Bowstring.png`,
    [itemSlots.ARROW]: `/images/${type}/Arrow.png`,
    [itemSlots.QUIVER]: `/images/${type}/Quiver.png`,
    // Hero
    [itemSlots.HEAD_HAIR]: `/images/${type}/Head Hair.png`,
    [itemSlots.HEAD_BEARD]: `/images/${type}/Head Beard.png`
  };
};

const getSconFile = (type: string) => {
  switch (type) {
    case 'mountain-warrior-5': {
      return '/archer.scon';
    }
    default:
      return '/common.scon';
  }
};

interface Props {
  imagesUrls: Record<string, string>;
  sconFileUrl: string;
}

export const getCharacterProps = (type: string): Props => {
  return {
    imagesUrls: getUrls(type),
    sconFileUrl: getSconFile(type)
  };
};
