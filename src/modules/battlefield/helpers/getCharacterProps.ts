import { CHARACTER_IMAGE_SLOT, DAMAGE_TYPE } from 'common/constants';
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
    [CHARACTER_IMAGE_SLOT.BODY]: `/images/characters/${type}/Body.png`,
    [CHARACTER_IMAGE_SLOT.FACE_01]: `/images/characters/${type}/Face 01.png`,
    [CHARACTER_IMAGE_SLOT.FACE_02]: `/images/characters/${type}/Face 02.png`,
    [CHARACTER_IMAGE_SLOT.FACE_03]: `/images/characters/${type}/Face 03.png`,
    [CHARACTER_IMAGE_SLOT.HEAD]: `/images/characters/${type}/Head.png`,
    [CHARACTER_IMAGE_SLOT.LEFT_ARM]: `/images/characters/${type}/Left Arm.png`,
    [CHARACTER_IMAGE_SLOT.LEFT_HAND]: `/images/characters/${type}/Left Hand.png`,
    [CHARACTER_IMAGE_SLOT.LEFT_LEG]: `/images/characters/${type}/Left Leg.png`,
    [CHARACTER_IMAGE_SLOT.RIGHT_ARM]: `/images/characters/${type}/Right Arm.png`,
    [CHARACTER_IMAGE_SLOT.RIGHT_HAND]: `/images/characters/${type}/Right Hand.png`,
    [CHARACTER_IMAGE_SLOT.RIGHT_LEG]: `/images/characters/${type}/Right Leg.png`,
    [CHARACTER_IMAGE_SLOT.SLASH_FX]: `/images/characters/${type}/SlashFX.png`,
    // Archer images
    ...(type.includes('archer')
      ? {
          [CHARACTER_IMAGE_SLOT.BOW]: `/images/characters/${type}/Bow.png`,
          [CHARACTER_IMAGE_SLOT.BOWSTRING]: `/images/characters/${type}/Bowstring.png`,
          [CHARACTER_IMAGE_SLOT.DRAWN_BOWSTRING]: `/images/characters/${type}/Drawn Bowstring.png`,
          [CHARACTER_IMAGE_SLOT.ARROW]: `/images/characters/${type}/Arrow.png`,
          [CHARACTER_IMAGE_SLOT.QUIVER]: `/images/characters/${type}/Quiver.png`
        }
      : {}),
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

export const getAppearance = (props: Props): AppearanceUrls => {
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

const getAnimationMap = (props: Props): Record<string, string> => {
  const { leftHand, rightHand, bow, shield } = props.equipment;

  if (bow) {
    return {
      attack: 'slashing_with_left_hand',
      idle: 'idle_with_bow',
      hurt: 'hurt_with_bow',
      die: 'dying_with_bow',
      effected: 'effected_with_bow'
    };
  }

  if (leftHand && rightHand) {
    return {
      attack: 'slashing_with_both_hands_style',
      idle: 'idle_with_both_hands_style',
      hurt: 'hurt_with_both_hands_style',
      die: 'dying_with_both_hands',
      effected: 'effected_with_both_hands_style',
      running: 'running_with_both_hands_style'
    };
  }

  if (rightHand && shield && !leftHand) {
    return {
      attack: 'slashing_with_left_hand_shield',
      idle: 'idle_with_left_hand_shield',
      hurt: 'hurt_with_left_hand_shield',
      die: 'dying_with_left_hand_shield',
      effected: 'effected_with_left_hand_shield',
      running: 'running_with_left_hand_shield'
    };
  }

  if (leftHand && shield && !rightHand) {
    return {
      attack: 'slashing_with_right_hand_shield',
      idle: 'idle_with_right_hand_shield',
      hurt: 'hurt_with_right_hand_shield',
      die: 'dying_with_right_hand_shield',
      effected: 'effected_with_right_hand_shield',
      running: 'running_with_right_hand_shield'
    };
  }

  if (rightHand && !leftHand) {
    return {
      attack: 'slashing_with_right_hand',
      idle: 'idle_with_right_hand_weapon',
      hurt: 'hurt_with_right_hand_weapon',
      die: 'dying_with_right_hand_weapon',
      effected: 'effected_with_right_hand_weapon',
      running: 'running_with_right_hand_weapon'
    };
  }

  return {
    attack: 'slashing_with_left_hand',
    idle: 'idle_with_left_hand_weapon',
    hurt: 'hurt_with_left_hand_weapon',
    die: 'dying_with_left_hand_weapon',
    effected: 'effected_with_left_hand_weapon',
    running: 'running_with_left_hand_weapon'
  };
};

const getCastEffectImageUrl = ({ damageType }: Props) => {
  switch (damageType) {
    case DAMAGE_TYPE.FIRE: {
      return '/images/effects/fire.png';
    }
    case DAMAGE_TYPE.WATER: {
      return '/images/effects/water.png';
    }
    default:
      return undefined;
  }
};

type ReturnType = {
  imagesUrls: Record<string, string>;
  sconFileUrl: string;
  animationMap?: Record<string, string>;
  castEffectImageUrl?: string;
};

type Props = {
  type: string;
  appearance?: Appearance;
  equipment: Equipment;
  damageType?: string;
};

export const getCharacterProps = (props: Props): ReturnType => {
  const { type } = props;

  return {
    imagesUrls: getAppearance(props),
    sconFileUrl: getSconFile(type),
    animationMap: getAnimationMap(props),
    ...(props.damageType
      ? { castEffectImageUrl: getCastEffectImageUrl(props) }
      : {})
  };
};
