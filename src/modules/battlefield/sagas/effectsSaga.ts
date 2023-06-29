import { takeLatest, select, put, call } from 'typed-redux-saga/macro';
import {
  startTrooperTurn as startTrooperTurnAction,
  applyEffectsFinished,
  applyEffectsStarted,
  setEffectDuration,
  removeEffect,
  applyDamage,
  modifyTrooper,
  setEffectDone
} from '../actions';
import { activeTrooperSelector } from '../selectors';

import type { Trooper, Effect, ApplyEffectProps } from '../types';

export const poisonEffect: Effect = {
  name: 'poison',
  duration: 1,
  done: false,
  applyEffect: function* ({ activeTrooper }: ApplyEffectProps) {
    yield* put(
      applyDamage({
        id: activeTrooper.id,
        damage: 5,
        team: activeTrooper.team
      })
    );
  }
};

export const mightEffect: Effect = {
  name: 'might',
  duration: 3,
  once: true,
  done: false,
  applyEffect: function* ({ activeTrooper }: ApplyEffectProps) {
    const [minDamage, maxDamage] = activeTrooper.damage.split('-');

    const damage = `${minDamage * 2}-${maxDamage * 2}`;

    yield* put(
      modifyTrooper({
        id: activeTrooper.id,
        updates: {
          damage
        },
        team: activeTrooper.team
      })
    );
  }
};

function* applyEffects() {
  const activeTrooper = yield* select(activeTrooperSelector);
  yield* put(applyEffectsStarted());

  if (!activeTrooper) return;
  const { effects, team, id } = activeTrooper;

  // EFFECTS COME HERE
  if (effects.length > 0) {
    for (const effect of effects) {
      if (effect.duration === 0) {
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
        yield* call([effect, 'applyEffect'], { activeTrooper });

        if (effect.once) {
          setEffectDone({
            team,
            id,
            name: effect.name,
            value: true,
          })
        }
      }

      yield* put(
        setEffectDuration({
          team,
          id,
          name: effect.name,
          duration: effect.duration - 1
        })
      );
    }
  }

  yield* put(applyEffectsFinished());
}

export function* effectSagaWatcher() {
  yield takeLatest(startTrooperTurnAction, applyEffects);
}
