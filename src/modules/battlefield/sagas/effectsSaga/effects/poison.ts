import type { ApplyEffectProps, Effect } from 'modules/battlefield/types';
import { call, put, fork } from 'typed-redux-saga';
import {
  applyDamage,
  finishTrooperTurn,
  removeAllEffects
} from 'modules/battlefield/actions';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import poisonIcon from './icons/poison.png';
import { CHARACTER_IMAGE_SLOT, DAMAGE_TYPE, EFFECT } from 'common/constants';
import { updateCharacterImages } from 'common/helpers';
import { applyDefenceAndResistance } from 'common/helpers/applyDefenceAndResistance';

export const createPoisonEffect = ({
  duration,
  damage
}: {
  duration: number;
  damage: number;
}): Effect => ({
  name: EFFECT.POISON,
  description: `"${EFFECT.POISON}" effect. Inflicts ${damage} poison damage at the
   beginning of target trooper turn.`,
  duration,
  done: false,
  applyEffect: function* ({ activeTrooper }: ApplyEffectProps) {
    const isDying = damage >= activeTrooper.currentHealth;
    const activeTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      activeTrooper.id
    );

    if (damage >= activeTrooper.currentHealth) {
      damage = damage - (damage - activeTrooper.currentHealth);
    }

    yield* call(
      updateCharacterImages,
      [
        {
          url: '/images/effects/poison.png',
          itemSlot: CHARACTER_IMAGE_SLOT.EFFECT
        }
      ],
      activeTrooper.id
    );

    yield* put(
      applyDamage({
        id: activeTrooper.id,
        damage: applyDefenceAndResistance(
          damage,
          DAMAGE_TYPE.POISON,
          activeTrooper
        ),
        damageType: DAMAGE_TYPE.POISON,
        team: activeTrooper.team
      })
    );

    if (isDying) {
      yield* call([activeTrooperAnimationInstance!, 'effected']);
      yield* fork([activeTrooperAnimationInstance!, 'die']);
      yield* put(
        removeAllEffects({
          id: activeTrooper.id,
          team: activeTrooper.team
        })
      );
      yield* put(finishTrooperTurn());
    } else {
      yield* call([activeTrooperAnimationInstance!, 'effected']);
    }
  },
  iconSrc: poisonIcon
});
