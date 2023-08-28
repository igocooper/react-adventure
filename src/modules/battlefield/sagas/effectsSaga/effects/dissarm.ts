import type { Effect, Trooper } from 'modules/battlefield/types';
import type { Equipment } from 'common/types';
import { put, select, call } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/reducers/troopsSlice';
import icon from './icons/dissarm.png';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';
import { ATTACK_TYPE, EFFECT, EFFECT_TYPE } from 'common/constants';
import {
  removeCharacterEquipmentStats,
  applyCharacterEquipmentStats,
  generateId,
  removeEquipment,
  updateCharacterImages
} from 'common/helpers';
import { detectCancelEffectUpdates } from './helpers/detectCancelEffectUpdates';
import { getAppearance } from '../../../helpers/getCharacterProps';

const getRevertTrooperUpdates = (trooper: Trooper) => {
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
    // return attack type for archers
    ...(equipment.bow ? { attackType: ATTACK_TYPE.RANGE } : {})
  };

  // figure out what the state of other effect would be after base is changed
  return effects.reduce(
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
};
const getTrooperUpdates = (trooper: Trooper) => {
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

    const updates = {
      ...trooperWithoutWeaponStats,
      damage: trooperWithoutWeaponStats.damage,
      baseWeaponDamage: trooperWithoutWeaponStats.damage,
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
    // change attack type for archers
    ...(equipment.bow ? { attackType: ATTACK_TYPE.MELEE } : {})
  };

  // figure out what the state of other effect would be after base is changed
  return effects.reduce(
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
};

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

      const updates = getTrooperUpdates(activeTrooper);

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

      const characterImagesToUpdate = yield* call(getAppearance, {
        equipment: {
          leftHand: activeTrooper.equipment.leftHand,
          rightHand: activeTrooper.equipment.rightHand,
          bow: activeTrooper.equipment.bow
        },
        characterAppearance: activeTrooper.appearance,
        type: activeTrooper.type
      });

      // stop displaying weapon
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
