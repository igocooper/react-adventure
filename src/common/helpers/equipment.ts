import type {
  Appearance,
  Armor,
  Equipment,
  Helmet,
  Bow,
  Shield,
  Weapon,
  Character,
  Resistance,
  ArmorStats,
  WeaponStats
} from 'common/types';
import { getDamage } from 'common/helpers';
import { CHARACTER_IMAGE_SLOT, HELMET_TYPE } from '../constants';

type AppearanceUrls = Record<string, string>;

const applyResistanceStats = (
  resistance: Resistance,
  itemResistance: Resistance
) => {
  return Object.entries(itemResistance).reduce(
    (result, [resistanceName, value]) => {
      const currentValue = result[resistanceName as keyof Resistance];
      return {
        ...result,
        [resistanceName]: currentValue! + value
      };
    },
    resistance
  );
};

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

export const equipShield = ({
  appearance,
  shield
}: {
  shield: Shield;
  appearance: AppearanceUrls;
}): AppearanceUrls => {
  return {
    ...appearance,
    [CHARACTER_IMAGE_SLOT.SHIELD]: shield.imageSrc
  };
};

export const equipBow = ({
  appearance,
  bow
}: {
  bow: Bow;
  appearance: AppearanceUrls;
}): AppearanceUrls => {
  return {
    ...appearance,
    [CHARACTER_IMAGE_SLOT.BOW]: bow.imageUrls.bowStem,
    [CHARACTER_IMAGE_SLOT.BOWSTRING]: bow.imageUrls.bowString,
    [CHARACTER_IMAGE_SLOT.DRAWN_BOWSTRING]: bow.imageUrls.drawnBowString,
    [CHARACTER_IMAGE_SLOT.QUIVER]: bow.imageUrls.quiver,
    [CHARACTER_IMAGE_SLOT.ARROW]: bow.imageUrls.arrow
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

  if (equipment.bow) {
    appearance = equipBow({
      appearance,
      bow: equipment.bow
    });
  }

  if (equipment.shield) {
    appearance = equipShield({
      appearance,
      shield: equipment.shield
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

const applyWeaponStats = <T>(
  itemStats: WeaponStats,
  stats: T & WeaponStats
): T => {
  return Object.entries(itemStats).reduce((result, [propertyName, value]) => {
    const currentValue = result[propertyName as keyof WeaponStats];
    // TODO: add abilities

    if (
      propertyName === 'damage' &&
      typeof currentValue === 'string' &&
      typeof value === 'string'
    ) {
      const [currentMinDamage, currentMaxDamage] = getDamage(currentValue);
      const [minDamage, maxDamage] = getDamage(value);

      return {
        ...result,
        [propertyName]: `${currentMinDamage + minDamage}-${
          currentMaxDamage + maxDamage
        }`
      };
    }

    if (typeof currentValue === 'number' && typeof value === 'number') {
      if (propertyName === 'criticalMultiplier') {
        return {
          ...result,
          [propertyName]: currentValue < value ? value : currentValue
        };
      }

      return {
        ...result,
        [propertyName]: currentValue ? currentValue + value : value
      };
    }

    return result;
  }, stats);
};

const applyArmorStats = <T>(
  itemStats: ArmorStats,
  stats: T & ArmorStats
): T => {
  return Object.entries(itemStats).reduce((result, [propertyName, value]) => {
    const currentValue = result[propertyName as keyof ArmorStats];

    if (propertyName === 'resistance') {
      return {
        ...result,
        [propertyName]: applyResistanceStats(
          currentValue as Resistance,
          value as Resistance
        )
      };
    }

    if (typeof currentValue === 'number' && typeof value === 'number') {
      return {
        ...result,
        [propertyName]: currentValue ? currentValue + value : value
      };
    }

    return result;
  }, stats);
};

export const applyCharacterEquipmentStats = (props: Character) => {
  const { equipment } = props;
  const { leftHand, rightHand, armor, helmet, bow, shield } = equipment;

  let equipmentStats = {
    damage: props.damage,
    criticalChance: props.criticalChance,
    criticalMultiplier: props.criticalMultiplier,
    defence: props.defence,
    power: props.power,
    evadeChance: props.evadeChance,
    resistance: props.resistance || {}
  };

  if (leftHand) {
    equipmentStats = applyWeaponStats(leftHand.stats, equipmentStats);
  }

  if (rightHand) {
    equipmentStats = applyWeaponStats(rightHand.stats, equipmentStats);
  }

  if (bow) {
    equipmentStats = applyWeaponStats(bow.stats, equipmentStats);
  }

  if (armor) {
    equipmentStats = applyArmorStats(armor.stats, equipmentStats);
  }

  if (shield) {
    equipmentStats = applyArmorStats(shield.stats, equipmentStats);
  }

  if (helmet) {
    equipmentStats = applyArmorStats(helmet.stats, equipmentStats);
  }

  return {
    ...props,
    ...equipmentStats
  };
};
