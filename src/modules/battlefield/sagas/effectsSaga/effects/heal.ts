import type { ApplyEffectProps, Effect } from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { applyHeal } from 'modules/battlefield/actions';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import healIcon from './icons/heal.png';
import { CHARACTER_IMAGE_SLOT } from 'common/constants';
import { updateCharacterImages } from 'common/helpers';

export const createHealEffect = ({
  duration,
  heal
}: {
  duration: number;
  heal: number;
}): Effect => ({
  name: 'heal',
  duration,
  done: false,
  applyEffect: function* ({ activeTrooper }: ApplyEffectProps) {
    const reachedMaxHP =
      heal + activeTrooper.currentHealth > activeTrooper.health;
    const activeTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      activeTrooper.id
    );

    if (reachedMaxHP) {
      heal = activeTrooper.health - activeTrooper.currentHealth;
    }

    yield* call(
      updateCharacterImages,
      [
        {
          url: '/images/effects/heal.png',
          itemSlot: CHARACTER_IMAGE_SLOT.EFFECT
        }
      ],
      activeTrooper.id
    );

    yield* put(
      applyHeal({
        id: activeTrooper.id,
        heal,
        team: activeTrooper.team
      })
    );
    yield* call([activeTrooperAnimationInstance!, 'effected']);
  },
  iconSrc: healIcon
});
