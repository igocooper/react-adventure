import type { Effect } from 'modules/battlefield/types';
import icon from './icons/bleeding.png';
import { DAMAGE_TYPE, EFFECT } from 'common/constants';
import { createApplyDamageEffect } from './generators/createApplyDamageEffect';

export const createBleedingEffect = ({
  duration,
  damage
}: {
  duration: number;
  damage: number;
}): Effect => ({
  name: EFFECT.BLEEDING,
  description: `"${EFFECT.BLEEDING}" effect. Inflicts ${damage} blood damage at the
   beginning of target trooper turn.`,
  duration,
  done: false,
  applyEffect: createApplyDamageEffect({
    damage,
    damageType: DAMAGE_TYPE.BLOOD,
    characterEffectImgSrc: '/images/effects/bleeding.png'
  }),
  iconSrc: icon
});
