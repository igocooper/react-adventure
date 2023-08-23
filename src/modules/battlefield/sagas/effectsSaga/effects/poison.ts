import type { Effect } from 'modules/battlefield/types';
import poisonIcon from './icons/poison.png';
import { DAMAGE_TYPE, EFFECT, EFFECT_TYPE } from 'common/constants';
import { createApplyDamageEffect } from './generators/createApplyDamageEffect';
import SFX from 'modules/SFX';
import { displayDuration, generateId } from 'common/helpers';

export const createPoisonEffect = ({
  duration,
  damage
}: {
  duration: number;
  damage: number;
}): Effect => ({
  id: generateId(),
  name: EFFECT.POISON,
  type: EFFECT_TYPE.CURSE,
  description: `"${EFFECT.POISON}" effect. Inflicts ${damage} poison damage at the
   beginning of target trooper turn.`,
  stackInfo: (duration) =>
    `deals <damage>${damage}</damage> damage. (Duration: ${displayDuration(
      duration
    )})`,
  duration,
  done: false,
  applyEffect: createApplyDamageEffect({
    damage,
    damageType: DAMAGE_TYPE.POISON,
    characterEffectImgSrc: '/images/effects/poison.png',
    sfx: () => {
      void SFX.poison.play();
    }
  }),
  iconSrc: poisonIcon
});
