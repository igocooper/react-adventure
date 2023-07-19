import type { ApplyEffectProps, Effect } from 'modules/battlefield/types';
import { put } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/reducers/troopsSlice';
import { multiplyDamage } from 'modules/battlefield/helpers/multiplyDamage';
import { divideDamage } from 'modules/battlefield/helpers/divideDamage';
import hexIcon from './icons/hex.png';
import { EFFECT } from 'common/constants';

export const createHexEffect = ({
  multiplier,
  duration
}: {
  multiplier: number;
  duration: number;
}): Effect => {
  return {
    name: EFFECT.HEX,
    description: `"${EFFECT.HEX}" effect. Decrease target damage ${multiplier} times.`,
    duration,
    once: true,
    done: false,
    applyEffect: function* ({ activeTrooper }: ApplyEffectProps) {
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
    cancelEffect: function* ({ activeTrooper }: ApplyEffectProps) {
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
    iconSrc: hexIcon
  };
};
