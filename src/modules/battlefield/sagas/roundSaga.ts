import { takeLatest, select, put, call } from 'typed-redux-saga/macro';
import {
  finishTrooperTurn,
  startRound as startRoundAction,
  finishRound as finishRoundAction,
  setRound,
  setInitiative,
  setActivePlayer
} from '../actions';
import {
  roundSelector,
  initiativeSelector,
  attackersSelector,
  defendersSelector
} from '../selectors';

import type { Trooper } from '../types';

function* initInitiative() {
  const attackers = yield* select(attackersSelector);
  const defenders = yield* select(defendersSelector);
  const troopers: Trooper[] = [...attackers, ...defenders];

  return troopers
    .sort((character1, character2) => {
      return character2.initiative - character1.initiative;
    })
    .map(({ id }, index) => ({
      id,
      index
    }));
}

function* finishRound() {
  const round = yield* select(roundSelector);
  const initiative = yield* select(initiativeSelector);

  if (initiative.length === 0) {
    yield* put(finishRoundAction(round));
    yield* put(startRoundAction(round + 1));
  }
}

function* startRound({ payload }: { payload: number }) {
  const initiative = yield* call(initInitiative);
  const activePlayer = initiative[0];
  yield* put(setRound(payload));
  yield* put(setInitiative(initiative));

  if (activePlayer) {
    yield* put(setActivePlayer(activePlayer));
  }
}

export function* roundSagaWatcher() {
  yield takeLatest(finishTrooperTurn, finishRound);
  yield takeLatest(startRoundAction, startRound);
}
