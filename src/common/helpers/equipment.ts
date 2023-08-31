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

const removeResistanceStats = (
  resistance: Resistance,
  itemResistance: Resistance
) => {
  return Object.entries(itemResistance).reduce(
    (result, [resistanceName, value]) => {
      const currentValue = result[resistanceName as keyof Resistance];
      return {
        ...result,
        [resistanceName]: currentValue - value
      };
    },
    resistance
  );
};

const applyResistanceStats = (
  resistance: Resistance,
  itemResistance: Resistance
) => {
  return Object.entries(itemResistance).reduce(
    (result, [resistanceName, value]) => {
      const currentValue = result[resistanceName as keyof Resistance];
      return {
        ...result,
        [resistanceName]: currentValue + value
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
  appearance?: AppearanceUrls;
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
      result[CHARACTER_IMAGE_SLOT.FACE_01] = '';
      result[CHARACTER_IMAGE_SLOT.FACE_02] = '';
      result[CHARACTER_IMAGE_SLOT.FACE_03] = '';
      result[CHARACTER_IMAGE_SLOT.HEAD] = '';
      result[CHARACTER_IMAGE_SLOT.HEAD_HAIR] = '';
      result[CHARACTER_IMAGE_SLOT.HEAD_BEARD] = '';
      result[removeHelmetSlot] = '';

      return {
        ...result,
        [helmetSlot]: helmet.imageSrc
      };
    }
    case HELMET_TYPE.LARGE: {
      result[removeHelmetSlot] = '';
      result[CHARACTER_IMAGE_SLOT.HEAD_HAIR] = '';

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
      result[removeHelmetSlot] = '';
      result[CHARACTER_IMAGE_SLOT.HEAD_HAIR] = '';

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
      result[removeHelmetSlot] = '';

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
  appearance = {},
  armor
}: {
  armor: Armor;
  appearance?: AppearanceUrls;
}): AppearanceUrls => {
  return {
    ...appearance,
    [CHARACTER_IMAGE_SLOT.BODY]: armor.imageUrls.body,
    [CHARACTER_IMAGE_SLOT.LEFT_ARM]: armor.imageUrls.leftArm,
    [CHARACTER_IMAGE_SLOT.LEFT_LEG]: armor.imageUrls.leftLeg,
    [CHARACTER_IMAGE_SLOT.RIGHT_ARM]: armor.imageUrls.rightArm,
    [CHARACTER_IMAGE_SLOT.RIGHT_LEG]: armor.imageUrls.rightLeg,
    ...(armor.imageUrls.rightHand
      ? { [CHARACTER_IMAGE_SLOT.RIGHT_HAND]: armor.imageUrls.rightHand }
      : {}),
    ...(armor.imageUrls.leftHand
      ? { [CHARACTER_IMAGE_SLOT.LEFT_HAND]: armor.imageUrls.leftHand }
      : {})
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

export const removeBow = (): AppearanceUrls => {
  return {
    [CHARACTER_IMAGE_SLOT.BOW]: '',
    [CHARACTER_IMAGE_SLOT.BOWSTRING]: '',
    [CHARACTER_IMAGE_SLOT.DRAWN_BOWSTRING]: '',
    [CHARACTER_IMAGE_SLOT.QUIVER]: '',
    [CHARACTER_IMAGE_SLOT.ARROW]: '',
    [CHARACTER_IMAGE_SLOT.SLASH_FX]: ''
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

export const removeLeftHandWeapon = (): AppearanceUrls => {
  return {
    [CHARACTER_IMAGE_SLOT.LEFT_HAND_WEAPON]: '',
    [CHARACTER_IMAGE_SLOT.SLASH_FX]: ''
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
    [CHARACTER_IMAGE_SLOT.LEFT_HAND_WEAPON]: weapon.imageUrls.weapon,
    [CHARACTER_IMAGE_SLOT.SLASH_FX]: weapon.imageUrls.slashFX
  };
};

export const removeRightHandWeapon = (): AppearanceUrls => {
  return {
    [CHARACTER_IMAGE_SLOT.RIGHT_HAND_WEAPON]: '',
    [CHARACTER_IMAGE_SLOT.SLASH_FX]: ''
  };
};

export const equipRightHandWeapon = ({
  appearance = {},
  weapon
}: {
  weapon: Weapon;
  appearance?: AppearanceUrls;
}): AppearanceUrls => {
  return {
    ...appearance,
    [CHARACTER_IMAGE_SLOT.RIGHT_HAND_WEAPON]: weapon.imageUrls.weapon,
    [CHARACTER_IMAGE_SLOT.SLASH_FX]: weapon.imageUrls.slashFX
  };
};

export const removeEquipment = ({ equipment }: { equipment: Equipment }) => {
  let appearance = {};

  if (equipment.leftHand) {
    appearance = removeLeftHandWeapon();
  }

  if (equipment.bow) {
    appearance = removeBow();
  }

  if (equipment.rightHand) {
    appearance = {
      ...appearance,
      ...removeRightHandWeapon()
    };
  }

  console.log('appearance', appearance);

  return appearance;
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

const removeWeaponStats = <T>(
  itemStats: WeaponStats,
  stats: T & WeaponStats
): T => {
  return Object.entries(itemStats).reduce((result, [propertyName, value]) => {
    const currentValue = result[propertyName as keyof WeaponStats];
    // TODO: remove abilities

    if (
      propertyName === 'damage' &&
      typeof currentValue === 'string' &&
      typeof value === 'string'
    ) {
      const [currentMinDamage, currentMaxDamage] = getDamage(currentValue);
      const [minDamage, maxDamage] = getDamage(value);

      return {
        ...result,
        [propertyName]: `${currentMinDamage - minDamage}-${
          currentMaxDamage - maxDamage
        }`
      };
    }

    if (typeof currentValue === 'number' && typeof value === 'number') {
      if (propertyName === 'criticalMultiplier') {
        // This property is being assign in the parent function as it's calculated based on context of character equipment
        // and we do not have access to it here
        return result;
      }

      return {
        ...result,
        [propertyName]: currentValue ? currentValue - value : value
      };
    }

    return result;
  }, stats);
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

const removeArmorStats = <T>(
  itemStats: ArmorStats,
  stats: T & ArmorStats
): T => {
  return Object.entries(itemStats).reduce((result, [propertyName, value]) => {
    const currentValue = result[propertyName as keyof ArmorStats];

    if (propertyName === 'resistance') {
      return {
        ...result,
        [propertyName]: removeResistanceStats(
          currentValue as Resistance,
          value as Resistance
        )
      };
    }

    if (typeof currentValue === 'number' && typeof value === 'number') {
      return {
        ...result,
        [propertyName]: currentValue - value
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

export const applyCharacterEquipmentStats = (
  character: Character,
  equipment: Equipment
) => {
  const { leftHand, rightHand, armor, helmet, bow, shield } = equipment;

  // base initialized with just character stats
  let equipmentStats = {
    damage: character.damage,
    initiative: character.initiative,
    hitChance: character.hitChance,
    criticalChance: character.criticalChance,
    criticalMultiplier: character.criticalMultiplier,
    counterAttackChance: character.counterAttackChance,
    defence: character.defence,
    healPower: character.healPower,
    evadeChance: character.evadeChance,
    resistance: character.resistance || {}
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
    ...character,
    ...equipmentStats
  };
};

export const removeCharacterEquipmentStats = (
  character: Character,
  equipment: Equipment,
  currentCharacterEquipment: Equipment
) => {
  const { leftHand, rightHand, armor, helmet, bow, shield } = equipment;

  // base initialized with character stats assuming that equipment
  // which is about to be removed in applied already, otherwise will lead to incorrect work
  let equipmentStats = {
    damage: character.damage,
    initiative: character.initiative,
    hitChance: character.hitChance,
    criticalChance: character.criticalChance,
    criticalMultiplier: character.criticalMultiplier,
    counterAttackChance: character.counterAttackChance,
    defence: character.defence,
    healPower: character.healPower,
    evadeChance: character.evadeChance,
    resistance: character.resistance || {}
  };

  // when character holds only left hand weapon
  if (
    currentCharacterEquipment.leftHand &&
    !currentCharacterEquipment.rightHand
  ) {
    if (leftHand) {
      equipmentStats = removeWeaponStats(leftHand.stats, equipmentStats);
      equipmentStats.criticalMultiplier = character.baseCriticalMultiplier || 0;
    }

    if (rightHand) {
      throw Error('this character does not have weapon in his right hand');
    }
  }

  // when character holds only right hand weapon
  if (
    currentCharacterEquipment.rightHand &&
    !currentCharacterEquipment.leftHand
  ) {
    if (rightHand) {
      equipmentStats = removeWeaponStats(rightHand.stats, equipmentStats);
      equipmentStats.criticalMultiplier = character.baseCriticalMultiplier || 0;
    }

    if (leftHand) {
      throw Error('this character does not have weapon in his left hand');
    }
  }

  // when character holds weapon in both hands
  if (
    currentCharacterEquipment.leftHand &&
    currentCharacterEquipment.rightHand
  ) {
    // when remove only left hand weapon
    if (leftHand && !rightHand) {
      equipmentStats = removeWeaponStats(leftHand.stats, equipmentStats);
      equipmentStats.criticalMultiplier =
        currentCharacterEquipment.rightHand.stats.criticalMultiplier ||
        character.baseCriticalMultiplier ||
        0;
    }

    // when remove only right hand weapon
    if (rightHand && !leftHand) {
      equipmentStats = removeWeaponStats(rightHand.stats, equipmentStats);
      equipmentStats.criticalMultiplier =
        currentCharacterEquipment.leftHand.stats.criticalMultiplier ||
        character.baseCriticalMultiplier ||
        0;
    }

    // when remove both weapons
    if (rightHand && leftHand) {
      equipmentStats = removeWeaponStats(rightHand.stats, equipmentStats);
      equipmentStats.criticalMultiplier = character.baseCriticalMultiplier || 0;
    }
  }

  if (bow) {
    if (!currentCharacterEquipment.bow) {
      throw Error('this character does not have bow');
    }
    equipmentStats = removeWeaponStats(bow.stats, equipmentStats);
  }

  if (armor) {
    if (!currentCharacterEquipment.armor) {
      throw Error('this character does not have any armor');
    }
    equipmentStats = removeArmorStats(armor.stats, equipmentStats);
  }

  if (shield) {
    if (!currentCharacterEquipment.shield) {
      throw Error('this character does not have any shield');
    }
    equipmentStats = removeArmorStats(shield.stats, equipmentStats);
  }

  if (helmet) {
    if (!currentCharacterEquipment.helmet) {
      throw Error('this character does not have any helmet');
    }
    equipmentStats = removeArmorStats(helmet.stats, equipmentStats);
  }

  return {
    ...character,
    ...equipmentStats
  };
};
