import type { Effect, Trooper } from 'modules/battlefield/types';
import type { DamageType, Equipment } from 'common/types';
import { put, select, call } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/reducers/troopsSlice';
import icon from './icons/dissarm.png';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import {
  ATTACK_TYPE,
  DAMAGE_TYPE,
  EFFECT,
  EFFECT_TYPE,
  SKILL,
  WEAPON_TYPE
} from 'common/constants';
import {
  removeCharacterEquipmentStats,
  applyCharacterEquipmentStats,
  generateId,
  removeEquipment,
  updateCharacterImages
} from 'common/helpers';
import { detectCancelEffectUpdates } from './helpers/detectCancelEffectUpdates';
import { getAppearance } from '../../../helpers/getCharacterProps';
import SFX from 'modules/SFX';
import type { DissarmedEquipment } from 'modules/battlefield/containers/AnimationAreaContainer/Dissarm';

function getRevertTrooperUpdates(
  this: Effect & { originalDamageType?: DamageType },
  trooper: Trooper
) {
  // we need to cancel effect which were applied before dissarm
  const dissarmEffectIndex = trooper.effects.findIndex(
    (effect) => effect.name === EFFECT.DISSARM
  );

  const effects =
    dissarmEffectIndex !== -1
      ? trooper.effects.slice(0, dissarmEffectIndex)
      : trooper.effects;

  const equipment: Equipment = {
    leftHand: trooper.equipment.leftHand,
    rightHand: trooper.equipment.rightHand,
    bow: trooper.equipment.bow
  };

  if (effects.length === 0) {
    const equipmentStats = applyCharacterEquipmentStats(trooper, equipment);

    const revertedUpdates = {
      ...equipmentStats,
      damage: equipmentStats.damage,
      baseWeaponDamage: equipmentStats.damage,
      damageType: this.originalDamageType!,
      // return attack type for archers
      ...(equipment.bow ? { attackType: ATTACK_TYPE.RANGE } : {})
    };

    return revertedUpdates;
  }

  // when other effects applied to the target trooper before dissarm
  // cancel current effects modification in reverse order to get default trooper stats
  const defaultTrooperState = effects.reduceRight((updatedTrooper, effect) => {
    if (effect.getRevertTrooperUpdates) {
      return {
        ...updatedTrooper,
        ...effect.getRevertTrooperUpdates(updatedTrooper)
      };
    } else {
      return updatedTrooper;
    }
  }, trooper);

  const equipmentStats = applyCharacterEquipmentStats(
    defaultTrooperState,
    equipment
  );

  const revertedUpdates = {
    ...equipmentStats,
    damage: equipmentStats.damage,
    baseWeaponDamage: equipmentStats.damage,
    damageType: this.originalDamageType!,
    // return attack type for archers
    ...(equipment.bow ? { attackType: ATTACK_TYPE.RANGE } : {})
  };

  // figure out what the state of other effect would be after base is changed
  return effects.reduce<Trooper>(
    (updatedTrooper, effect) => {
      if (effect.getTrooperUpdates) {
        return {
          ...updatedTrooper,
          ...effect.getTrooperUpdates(updatedTrooper)
        };
      } else {
        return updatedTrooper;
      }
    },
    {
      ...trooper,
      ...revertedUpdates
    }
  );
}
function getTrooperUpdates(
  this: Effect & { originalDamageType?: string },
  trooper: Trooper
) {
  // we need to cancel effect which were applied before dissarm
  const dissarmEffectIndex = trooper.effects.findIndex(
    (effect) => effect.name === EFFECT.DISSARM
  );
  const effects =
    dissarmEffectIndex !== -1
      ? trooper.effects.slice(0, dissarmEffectIndex)
      : trooper.effects;

  const equipment: Equipment = {
    leftHand: trooper.equipment.leftHand,
    rightHand: trooper.equipment.rightHand,
    bow: trooper.equipment.bow
  };

  // when no other effects applied to the target trooper
  if (effects.length === 0) {
    const trooperWithoutWeaponStats = removeCharacterEquipmentStats(
      trooper,
      equipment,
      trooper.equipment
    );

    this.originalDamageType = trooper.damageType;

    const updates = {
      ...trooperWithoutWeaponStats,
      damage: trooperWithoutWeaponStats.damage,
      baseWeaponDamage: trooperWithoutWeaponStats.damage,
      damageType: DAMAGE_TYPE.BARE_HANDS,
      // return attack type for archers
      ...(equipment.bow ? { attackType: ATTACK_TYPE.MELEE } : {})
    };

    return updates;
  }

  // when other effects applied to the target trooper before dissarm
  // cancel current effects modification in reverse order to get default trooper stats
  const defaultTrooperState = effects.reduceRight((updatedTrooper, effect) => {
    if (effect.getRevertTrooperUpdates) {
      return {
        ...updatedTrooper,
        ...effect.getRevertTrooperUpdates(updatedTrooper)
      };
    } else {
      return updatedTrooper;
    }
  }, trooper);

  const trooperWithoutWeaponStats = removeCharacterEquipmentStats(
    defaultTrooperState,
    equipment,
    defaultTrooperState.equipment
  );

  const updates = {
    ...trooperWithoutWeaponStats,
    damage: trooperWithoutWeaponStats.damage,
    baseWeaponDamage: trooperWithoutWeaponStats.damage,
    damageType: DAMAGE_TYPE.BARE_HANDS,
    // change attack type for archers
    ...(equipment.bow ? { attackType: ATTACK_TYPE.MELEE } : {})
  };

  // figure out what the state of other effect would be after base is changed
  return effects.reduce<Trooper>(
    (updatedTrooper, effect) => {
      if (effect.getTrooperUpdates) {
        return {
          ...updatedTrooper,
          ...effect.getTrooperUpdates(updatedTrooper)
        };
      } else {
        return updatedTrooper;
      }
    },
    {
      ...trooper,
      ...updates
    }
  );
}

export const createDissarmEffect = ({
  duration
}: {
  duration: number;
}): Effect => {
  return {
    id: generateId(),
    name: EFFECT.DISSARM,
    type: EFFECT_TYPE.CURSE,
    description: `"${EFFECT.DISSARM}" you've lost your weapon`,
    duration,
    once: true,
    stacks: false,
    done: false,
    iconSrc: icon,
    applyEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;

      // we bind context so it could store original  data inside effect so it could be reverted later
      const updates = getTrooperUpdates.call(this, activeTrooper);

      const characterImagesToUpdate = yield* call(removeEquipment, {
        equipment: {
          leftHand: activeTrooper.equipment.leftHand,
          rightHand: activeTrooper.equipment.rightHand,
          bow: activeTrooper.equipment.bow
        }
      });

      // stop displaying weapon
      yield* call(
        updateCharacterImages,
        activeTrooper.id,
        characterImagesToUpdate
      );

      const dissarmAnimation = yield* call(
        getAreaEffectAnimationInstance,
        SKILL.DISSARM
      );

      void SFX.dissarm.play();
      void SFX.dissarmFalling.play();

      const equipment: DissarmedEquipment = prepareEquipment(activeTrooper);

      if (dissarmAnimation) {
        yield* call(dissarmAnimation.add!, activeTrooper.id, equipment);
        yield* call(dissarmAnimation.play, activeTrooper.id);
      }

      yield* call(playDroppedEffect, equipment);

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates,
          team: activeTrooper.team
        })
      );
    },
    cancelEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;

      const dissarmAnimation = yield* call(
        getAreaEffectAnimationInstance,
        SKILL.DISSARM
      );

      if (dissarmAnimation) {
        yield* call(dissarmAnimation.remove!, activeTrooper.id);
      }

      // start displaying weapon
      const characterImagesToUpdate = yield* call(getAppearance, {
        equipment: {
          leftHand: activeTrooper.equipment.leftHand,
          rightHand: activeTrooper.equipment.rightHand,
          bow: activeTrooper.equipment.bow
        },
        characterAppearance: activeTrooper.appearance,
        type: activeTrooper.type
      });

      void SFX.equip.play();

      yield* call(
        updateCharacterImages,
        activeTrooper.id,
        characterImagesToUpdate
      );

      const updates = detectCancelEffectUpdates(this.id, activeTrooper);

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates,
          team: activeTrooper.team
        })
      );
    },
    getTrooperUpdates,
    getRevertTrooperUpdates
  };
};

const prepareEquipment = (activeTrooper: Trooper) => {
  return {
    ...(activeTrooper.equipment.leftHand
      ? {
          leftHand: {
            type: activeTrooper.equipment.leftHand.type,
            src: activeTrooper.equipment.leftHand.imageUrls.weapon
          }
        }
      : {}),
    ...(activeTrooper.equipment.rightHand
      ? {
          rightHand: {
            type: activeTrooper.equipment.rightHand.type,
            src: activeTrooper.equipment.rightHand.imageUrls.weapon
          }
        }
      : {}),
    ...(activeTrooper.equipment.bow
      ? {
          bow: {
            type: activeTrooper.equipment.bow.type,
            src: activeTrooper.equipment.bow.imageUrls.bowStem
          }
        }
      : {})
  };
};

const playDroppedEffect = (equipment: DissarmedEquipment) => {
  if (
    equipment.bow?.src ||
    (!equipment.rightHand &&
      equipment.leftHand?.type === WEAPON_TYPE.WOODEN_STAFF) ||
    (!equipment.leftHand &&
      equipment.rightHand?.type === WEAPON_TYPE.WOODEN_STAFF)
  ) {
    void SFX.droppedWooden.play();
    return;
  }

  void SFX.droppedMetal.play();
};
