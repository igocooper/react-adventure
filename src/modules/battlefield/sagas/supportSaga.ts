import { takeLatest, put, all, call, select } from 'typed-redux-saga/macro';
import { supportStarted, supportFinished } from '../actions';
import { applyBuffs } from './abilitiesSaga';
import type { Trooper } from '../types';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { activeTrooperSelector, makeCharacterByIdSelector } from '../selectors';
import { SUPPORT_TYPE } from 'common/constants';
import { createHealEffect } from './effectsSaga/effects';

function* support({
  payload: selectedTrooperInfo
}: {
  payload: Pick<Trooper, 'id' | 'team'>;
}) {
  const activeTrooper = yield* select(activeTrooperSelector);
  const targetTrooper = yield* select(
    makeCharacterByIdSelector(selectedTrooperInfo.id)
  );

  if (!activeTrooper?.supportType) return;

  if (activeTrooper.supportType === SUPPORT_TYPE.HEAL) {
    const healEffect = createHealEffect({
      duration: 0,
      heal: activeTrooper.power!
    });

    const activeTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      activeTrooper.id
    );

    yield* all([
      call([activeTrooperAnimationInstance!, 'cast']),
      call([healEffect, 'applyEffect'], { activeTrooper: targetTrooper! })
    ]);

    yield* call(applyBuffs, { id: selectedTrooperInfo.id });
  }

  yield* call(applyBuffs, { id: selectedTrooperInfo.id });

  yield* put(supportFinished(selectedTrooperInfo));
}

export function* suportSagaWatcher() {
  yield takeLatest(supportStarted, support);
}
