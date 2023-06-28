import {
  takeLatest,
  select,
  put,
  call,
  take,
  takeEvery
} from 'typed-redux-saga/macro';
import {
  finishTrooperTurn as finishTrooperTurnAction,
  startRound as startRoundAction,
  finishRound as finishRoundAction,
  performAITurn,
  setRound,
  setInitiative,
  setActivePlayer,
  trooperClicked,
  attackStarted,
  attackFinished,
  supportStarted,
  supportFinished,
  setBattlefieldStatus
} from '../actions';
import {
  roundSelector,
  initiativeSelector,
  attackersSelector,
  defendersSelector,
  battlefieldDisabledStatusSelector,
  activeTrooperSelector,
  makeCanMeleeTrooperAttackSelector,
  makeCharacterByIdSelector
} from '../selectors';

import type { Trooper } from '../types';
import { ATTACK_TYPE } from '../constants';

function* getTroopersHealthMap() {
  const attackers = yield* select(attackersSelector);
  const defenders = yield* select(defendersSelector);
  const troopers: Trooper[] = [...attackers, ...defenders];

  return troopers.reduce(
    (
      res: Record<Trooper['id'], Trooper['currentHealth']>,
      { currentHealth, id }
    ) => {
      return {
        ...res,
        [id]: currentHealth
      };
    },
    {}
  );
}

function* initInitiative() {
  const attackers = yield* select(attackersSelector);
  const defenders = yield* select(defendersSelector);
  const troopers: Trooper[] = [...attackers, ...defenders];

  return troopers
    .filter((trooper) => Boolean(trooper.currentHealth))
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
  const troopersHealthMap = yield* call(getTroopersHealthMap);
  const updatedInitiative = initiative
    .slice(1)
    .filter(({ id }) => troopersHealthMap[id]! > 0);

  if (updatedInitiative.length === 0) {
    yield* put(finishRoundAction(round));
    yield* put(startRoundAction(round + 1));
  }

  const nextActivePlayer = updatedInitiative[0];

  if (nextActivePlayer) {
    yield* put(setActivePlayer(nextActivePlayer));
    yield* put(setInitiative(updatedInitiative));

    const nextActiveTrooper = yield* select(
      makeCharacterByIdSelector(nextActivePlayer.id)
    );

    if (nextActiveTrooper?.AIType) {
      yield* put(performAITurn());
    }
  }
}

function* startRound({ payload }: { payload: number }) {
  const initiative = yield* call(initInitiative);
  const activePlayer = initiative[0];
  yield* put(setRound(payload));
  yield* put(setInitiative(initiative));

  if (activePlayer) {
    yield* put(setActivePlayer(activePlayer));

    const activeTrooper = yield* select(
      makeCharacterByIdSelector(activePlayer.id)
    );

    if (activeTrooper?.AIType) {
      yield* put(performAITurn());
    }
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

  yield* put(setBattlefieldStatus(true));

  const { team, id } = clickedTrooperInfo;
  const activeTrooper = yield* select(activeTrooperSelector);
  const isEnemySelected = activeTrooper && activeTrooper.team !== team;
  const canMeleeTrooperAttack = yield* select(
    makeCanMeleeTrooperAttackSelector(id)
  );
  const selectedTrooper = yield* select(
    makeCharacterByIdSelector(clickedTrooperInfo.id)
  );
  const isEnemyDead = selectedTrooper!.currentHealth <= 0;

  if (isEnemySelected) {
    if (
      (activeTrooper.attackType === ATTACK_TYPE.MELEE &&
        !canMeleeTrooperAttack) ||
      isEnemyDead // TODO: we can show hint saying that this trooper is DEAD 💀 already
    ) {
      return;
    }

    yield* put(attackStarted(clickedTrooperInfo));

    yield* take(attackFinished);
  } else {
    yield* put(supportStarted(clickedTrooperInfo));

    yield* take(supportFinished);
  }

  yield* put(setBattlefieldStatus(false));
  yield* put(finishTrooperTurnAction());
}

export function* roundSagaWatcher() {
  yield takeLatest(finishTrooperTurnAction, finishTrooperTurn);
  yield takeLatest(startRoundAction, startRound);
  yield takeEvery(trooperClicked, handleTrooperClick);
}
