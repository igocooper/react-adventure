import type { ApplyEffectProps, Effect } from 'modules/battlefield/types';
import { put } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/reducers/troopsSlice';
import { multiplyDamage } from 'modules/battlefield/helpers/multiplyDamage';
import { divideDamage } from 'modules/battlefield/helpers/divideDamage';
import mightIcon from './icons/might.png';
import { getEffectNode } from '../../../effectsNodesMap';

export const createMightEffect = ({
  multiplier,
  duration
}: {
  multiplier: number;
  duration: number;
}): Effect => {
  return {
    name: 'might',
    duration,
    once: true,
    done: false,
    applyEffect: function* ({ activeTrooper }: ApplyEffectProps) {
      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates: {
            damage: multiplyDamage(activeTrooper.damage, multiplier)
          },
          team: activeTrooper.team
        })
      );
    },
    cancelEffect: function* ({ activeTrooper }: ApplyEffectProps) {
      const effectNode = getEffectNode(activeTrooper.id);

      effectNode!.style.removeProperty('transform');

      yield* put(
        modifyTrooper({
          id: activeTrooper.id,
          updates: {
            damage: divideDamage(activeTrooper.damage, multiplier)
          },
          team: activeTrooper.team
        })
      );
    },
    iconSrc: mightIcon
  };
};
