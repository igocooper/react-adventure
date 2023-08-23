import type { ApplyEffectProps, Effect } from 'modules/battlefield/types';
import { put } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/reducers/troopsSlice';
import { extractDamage } from 'modules/battlefield/helpers/extractDamage';
import { getPercentOfBaseDamage } from 'modules/battlefield/helpers/getPercentOfBaseDamage';
import { addDamage } from 'modules/battlefield/helpers/addDamage';
import mightIcon from './icons/might.png';
import { getEffectNode } from '../../../effectsNodesMap';
import { EFFECT, EFFECT_TYPE } from 'common/constants';
import { displayDuration, generateId } from 'common/helpers';
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
    applyEffect: function* ({ activeTrooper }: ApplyEffectProps) {
      const damageToAdd = getPercentOfBaseDamage(
        activeTrooper.baseWeaponDamage!,
        percent
      );

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates: {
            damage: addDamage(activeTrooper.damage, damageToAdd)
          },
          team: activeTrooper.team
        })
      );
    },
    cancelEffect: function* ({ activeTrooper }: ApplyEffectProps) {
      const damageToExtract = getPercentOfBaseDamage(
        activeTrooper.baseWeaponDamage!,
        percent
      );
      const effectNode = getEffectNode(activeTrooper.id);

      effectNode!.style.removeProperty('transform');

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates: {
            damage: extractDamage(activeTrooper.damage, damageToExtract)
          },
          team: activeTrooper.team
        })
      );
    },
    iconSrc: mightIcon
  };
};
