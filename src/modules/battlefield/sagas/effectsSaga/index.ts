import { put, call } from 'typed-redux-saga/macro';
import { setEffectDuration, removeEffect, setEffectDone } from '../../actions';
import type { Trooper } from 'modules/battlefield/types';

export function* applyEffects(activeTrooper: Trooper) {
  const { effects, team, id, hasWaited } = activeTrooper;
  const delayedEffects = [];

  if (hasWaited) return;

  for (const effect of effects) {
    if (effect.duration === 0) {
      if (effect.cancelEffect) {
        yield* call(effect.cancelEffect.bind(effect), {
          targetTrooperId: activeTrooper.id
        });
      }

      yield* put(
        removeEffect({
          team,
          id,
          effectId: effect.id
        })
      );
      continue;
    }

    yield* put(
      setEffectDuration({
        team,
        id,
        effectId: effect.id,
        duration: effect.duration - 1
      })
    );

    if (!effect.done) {
      if (effect.once) {
        yield* put(
          setEffectDone({
            team,
            id,
            effectId: effect.id,
            value: true
          })
        );
      }

      const delayedEffect = yield* call([effect, 'applyEffect'], {
        targetTrooperId: activeTrooper.id
      });

      if (delayedEffect) {
        delayedEffects.push(delayedEffect);
      }
    }
  }

  for (const delayedEffect of delayedEffects) {
    yield* call(delayedEffect);
  }
}
