import type { Effect, Trooper } from 'modules/battlefield/types';
import { put, select } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/reducers/troopsSlice';
import { substractDamage } from 'modules/battlefield/helpers/substractDamage';
import { getPercentOfBaseDamage } from 'modules/battlefield/helpers/getPercentOfBaseDamage';
import { addDamage } from 'modules/battlefield/helpers/addDamage';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';
import { EFFECT, EFFECT_TYPE } from 'common/constants';
import { displayDuration, generateId } from 'common/helpers';
import hexIcon from './icons/hex.png';
import { detectCancelEffectUpdates } from './helpers/detectCancelEffectUpdates';

const createGetRevertTrooperUpdates =
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

const createGetTrooperUpdates =
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
export const createHexEffect = ({
  percent,
  duration
}: {
  percent: number;
  duration: number;
}): Effect => {
  return {
    id: generateId(),
    name: EFFECT.HEX,
    type: EFFECT_TYPE.CURSE,
    description: `"${EFFECT.HEX}" effect. Decrease target damage by ${percent} %.`,
    stackInfo: (duration) =>
      `Decrease damage by <curse>${percent}%</curse>. (Duration: ${displayDuration(
        duration
      )})`,
    duration,
    once: true,
    done: false,
    iconSrc: hexIcon,
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
