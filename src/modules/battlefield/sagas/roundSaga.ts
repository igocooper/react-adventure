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
  startTrooperTurn as startTrooperTurnAction,
  startRound as startRoundAction,
  finishRound as finishRoundAction,
  waitClicked as waitClickedAction,
  performAITurn,
  setRound,
  setInitiative,
  setActivePlayer,
  trooperClicked,
  attackStarted,
  attackFinished,
  supportStarted,
  supportFinished,
  setBattlefieldStatus,
  resetDamageEvents,
  modifyTrooper,
  blockClicked as blockClickedAction,
  addEffect
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
import { ATTACK_TYPE, EFFECT } from '../constants';
import { applyEffects } from './effectsSaga';
import { createBlockEffect } from './effectsSaga/effects/block';
import { getAreaEffectAnimationInstance } from '../../animation/areaEffectsAnimationInstances';

function* resetHasWaitedTrooperStatus() {
  const attackers = yield* select(attackersSelector);
  const defenders = yield* select(defendersSelector);
  const troopers: Trooper[] = [...attackers, ...defenders];

  for (const trooper of troopers) {
    if (trooper.hasWaited) {
      yield* put(
        modifyTrooper({
          id: trooper.id,
          team: trooper.team,
          updates: {
            hasWaited: false
          }
        })
      );
    }
  }
}

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
    .map(({ id }) => ({
      id
    }));
}

function* startTrooperTurn() {
  const activeTrooper = yield* select(activeTrooperSelector);

  if (activeTrooper && activeTrooper.effects.length > 0) {
    yield* call(applyEffects, activeTrooper);
  }

  if (activeTrooper?.AIType) {
    yield* put(performAITurn());
  }
}

export function* finishTrooperTurn() {
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
    yield* put(startTrooperTurnAction());
  }
}

function* startRound({ payload }: { payload: number }) {
  yield* put(resetDamageEvents());
  yield* call(resetHasWaitedTrooperStatus);
  const initiative = yield* call(initInitiative);
  const activePlayer = initiative[0];
  yield* put(setRound(payload));
  yield* put(setInitiative(initiative));

  if (activePlayer) {
    yield* put(setActivePlayer(activePlayer));
    yield* put(startTrooperTurnAction());
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
      yield* put(setBattlefieldStatus(false));
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

function* handleWaitClick({
  payload
}: {
  payload: Pick<Trooper, 'id' | 'team'>;
}) {
  const { id } = payload;
  const initiative = yield* select(initiativeSelector);
  const activeTrooperInitiative = initiative.find(
    (trooper) => trooper.id === id
  );
  const activeTrooper = yield* select(activeTrooperSelector);

  if (activeTrooper) {
    const updatedInitiative = [...initiative, activeTrooperInitiative!];

    yield* put(
      modifyTrooper({
        id: activeTrooper.id,
        team: activeTrooper.team,
        updates: {
          hasWaited: true
        }
      })
    );
    yield* put(setInitiative(updatedInitiative));
    yield* put(finishTrooperTurnAction());
  }
}

function* handleBlockClick() {
  const activeTrooper = yield* select(activeTrooperSelector);

  if (activeTrooper) {
    const blockEffect = createBlockEffect();

    const blockAnimation = yield* call(
      getAreaEffectAnimationInstance,
      EFFECT.BLOCK
    );

    yield* call(blockAnimation!.play);
    yield* call(blockEffect.applyEffect, { activeTrooper });
    yield* put(
      addEffect({
        id: activeTrooper.id,
        team: activeTrooper.team,
        effect: createBlockEffect()
      })
    );
  }
  yield* put(finishTrooperTurnAction());
}

export function* roundSagaWatcher() {
  yield takeLatest(finishTrooperTurnAction, finishTrooperTurn);
  yield takeLatest(startTrooperTurnAction, startTrooperTurn);
  yield takeLatest(startRoundAction, startRound);
  yield takeEvery(trooperClicked, handleTrooperClick);
  yield takeLatest(waitClickedAction, handleWaitClick);
  yield takeLatest(blockClickedAction, handleBlockClick);
}
