import type { Effect } from 'modules/battlefield/types';
import { call, put, select } from 'typed-redux-saga';
import { applyHeal } from 'modules/battlefield/actions';
import SFX from 'modules/SFX';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';
import healIcon from './icons/continues-heal.png';
import { EFFECT, EFFECT_TYPE } from 'common/constants';
import { publishDamageEvent } from 'modules/battlefield/sagas/damageEventsSaga';
import { playEffectedAnimation } from 'modules/battlefield/helpers/playEffectedAnimation';
import theme from 'theme/defaultTheme';
import { displayDuration, generateId } from 'common/helpers';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';

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
  applyEffect: function* ({ targetTrooperId }) {
    const activeTrooper = yield* select(
      makeCharacterByIdSelector(targetTrooperId)
    );
    if (!activeTrooper) return;

    const reachedMaxHP =
      heal + activeTrooper.currentHealth > activeTrooper.health;

    if (reachedMaxHP) {
      heal = activeTrooper.health - activeTrooper.currentHealth;
    }

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
    yield* call(
      playEffectedAnimation,
      activeTrooper.id,
      resolveAssetUrl('/images/effects/heal.png')
    );
  },
  iconSrc: healIcon
});
