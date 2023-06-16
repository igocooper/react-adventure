import { takeLatest, select, put, call, take } from 'typed-redux-saga/macro';
import {
  finishTrooperTurn as finishTrooperTurnAction,
  startRound as startRoundAction,
  finishRound as finishRoundAction,
  setRound,
  setInitiative,
  setActivePlayer,
  trooperClicked,
  attackStarted,
  attackFinished,
  supportStarted,
  supportFinished
} from '../actions';
import {
  roundSelector,
  initiativeSelector,
  attackersSelector,
  defendersSelector,
  battlefieldDisabledStatusSelector,
  activeTrooperSelector,
  makeCanMeleeTrooperAttackSelector
} from '../selectors';

import type { Trooper } from '../types';
import { ATTACK_TYPE } from '../constants';

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

function* finishTrooperTurn() {
  const round = yield* select(roundSelector);
  const initiative = yield* select(initiativeSelector);

  if (initiative.length === 1) {
    yield* put(finishRoundAction(round));
    yield* put(startRoundAction(round + 1));
  }

  const nextActivePlayer = initiative[1];

  if (nextActivePlayer) {
    yield* put(setActivePlayer(nextActivePlayer));
    yield* put(setInitiative(initiative.slice(1)));
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

function* handleTrooperClick({
  payload: clickedTrooperInfo
}: {
  payload: Pick<Trooper, 'id' | 'team'>;
}) {
  const isBattleFieldDisabled = yield* select(
    battlefieldDisabledStatusSelector
  );

  if (isBattleFieldDisabled) return;

  const { team, id } = clickedTrooperInfo;
  const activeTrooper = yield* select(activeTrooperSelector);
  const isEnemySelected = activeTrooper && activeTrooper.team !== team;
  const canMeleeTrooperAttack = yield* select(
    makeCanMeleeTrooperAttackSelector(id)
  );

  if (isEnemySelected) {
    if (
      activeTrooper.attackType === ATTACK_TYPE.MELEE &&
      !canMeleeTrooperAttack
    ) {
      return;
    }

    yield* put(attackStarted(clickedTrooperInfo));

    yield* take(attackFinished);
  } else {
    yield* put(supportStarted(clickedTrooperInfo));

    yield* take(supportFinished);
  }
  yield* put(finishTrooperTurnAction());
}

export function* roundSagaWatcher() {
  yield takeLatest(finishTrooperTurnAction, finishTrooperTurn);
  yield takeLatest(startRoundAction, startRound);
  yield takeLatest(trooperClicked, handleTrooperClick);
}
