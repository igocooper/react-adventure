import { put, call } from 'typed-redux-saga/macro';
import { setEffectDuration, removeEffect, setEffectDone } from '../../actions';
import type { Trooper } from 'modules/battlefield/types';

export function* applyEffects(activeTrooper: Trooper) {
  const { effects, team, id, hasWaited } = activeTrooper;

  if (hasWaited) return;

  for (const effect of effects) {
    if (effect.duration === 0) {
      if (effect.cancelEffect) {
        yield* call(effect.cancelEffect, { activeTrooper });
      }

      yield* put(
        removeEffect({
          team,
          id,
          name: effect.name
        })
      );
      return;
    }

    if (!effect.done) {
      yield* put(
        setEffectDuration({
          team,
          id,
          name: effect.name,
          duration: effect.duration - 1
        })
      );

      if (effect.once) {
        yield* put(
          setEffectDone({
            team,
            id,
            name: effect.name,
            value: true
          })
        );
      }

      yield* call([effect, 'applyEffect'], { activeTrooper });
    }
  }
}
