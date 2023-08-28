import type { Effect, Trooper } from 'modules/battlefield/types';
import { put, select } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/reducers/troopsSlice';
import { getPercentOfBaseDamage } from 'modules/battlefield/helpers/getPercentOfBaseDamage';
import { addDamage } from 'modules/battlefield/helpers/addDamage';
import { substractDamage } from 'modules/battlefield/helpers/substractDamage';
import mightIcon from './icons/might.png';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';
import { getEffectNode } from 'modules/battlefield/effectsNodesMap';
import { EFFECT, EFFECT_TYPE } from 'common/constants';
import { displayDuration, generateId } from 'common/helpers';
import { detectCancelEffectUpdates } from './helpers/detectCancelEffectUpdates';

const createGetRevertTrooperUpdates =
  ({ percent }: { percent: number }) =>
  (trooper: Trooper) => {
    const damageToSubstract = getPercentOfBaseDamage(
      trooper.baseWeaponDamage!,
      percent
    );

    return {
      damage: substractDamage(trooper.damage, damageToSubstract)
    };
  };
const createGetTrooperUpdates =
  ({ percent }: { percent: number }) =>
  (trooper: Trooper) => {
    const damageToAdd = getPercentOfBaseDamage(
      trooper.baseWeaponDamage!,
      percent
    );

    return {
      damage: addDamage(trooper.damage, damageToAdd)
    };
  };

export const createMightEffect = ({
  percent,
  duration
}: {
  percent: number;
  duration: number;
}): Effect => {
  return {
    id: generateId(),
    name: EFFECT.MIGHT,
    type: EFFECT_TYPE.BUFF,
    description: `"${EFFECT.MIGHT}" effect. Increase target damage by ${percent}%.`,
    stackInfo: (duration) =>
      `Increase damage by <buff>${percent}%</buff>. (Duration: ${displayDuration(
        duration
      )})`,
    duration,
    once: true,
    done: false,
    iconSrc: mightIcon,
    applyEffect: function* ({ targetTrooperId }) {
      const activeTrooper = yield* select(
        makeCharacterByIdSelector(targetTrooperId)
      );
      if (!activeTrooper) return;
      const getTrooperModification = createGetTrooperUpdates({ percent });
      const updates = getTrooperModification(activeTrooper);

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

      const effectNode = getEffectNode(activeTrooper.id);

      effectNode!.style.removeProperty('transform');

      const updates = detectCancelEffectUpdates(this.id, activeTrooper);

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates,
          team: activeTrooper.team
        })
      );
    },
    getTrooperUpdates: createGetTrooperUpdates({ percent }),
    getRevertTrooperUpdates: createGetRevertTrooperUpdates({ percent })
  };
};
