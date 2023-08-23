import type { ApplyEffectProps, Effect } from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { applyHeal } from 'modules/battlefield/actions';
import SFX from 'modules/SFX';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import healIcon from './icons/continues-heal.png';
import { CHARACTER_IMAGE_SLOT, EFFECT, EFFECT_TYPE } from 'common/constants';
import { publishDamageEvent } from 'modules/battlefield/sagas/damageEventsSaga';
import theme from 'theme/defaultTheme';
import {
  displayDuration,
  generateId,
  updateCharacterImages
} from 'common/helpers';

export const createContinuesHealEffect = ({
  duration,
  heal
}: {
  duration: number;
  heal: number;
}): Effect => ({
  id: generateId(),
  name: EFFECT.CONTINUES_HEAL,
  type: EFFECT_TYPE.BUFF,
  description: `"${EFFECT.CONTINUES_HEAL}" effect. Heal target by ${heal} HP on each turn.`,
  stackInfo: (duration) =>
    `Heals <heal>${heal}</heal> HP. (Duration: ${displayDuration(duration)})`,
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

    yield* call(publishDamageEvent, {
      id: activeTrooper.id,
      value: `+${heal}`,
      color: theme.colors.heal,
      delay: 400
    });

    yield* put(
      applyHeal({
        id: activeTrooper.id,
        heal,
        team: activeTrooper.team
      })
    );
    void SFX.healed.play();
    yield* call([activeTrooperAnimationInstance!, 'effected']);
  },
  iconSrc: healIcon
});
