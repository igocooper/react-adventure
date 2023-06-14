import { put, select, takeLatest, call, take } from 'typed-redux-saga/macro';
import {
  finishTrooperTurn as finishTrooperTurnAction,
  setCursor as setCursorAction,
  setHoveredElement as setHoveredElementAction,
  setActivePlayer as setActivePlayerAction
} from '../actions';
import {
  activePlayerIdSelector,
  attackersSelector,
  battlefieldDisabledStatusSelector,
  defendersSelector,
  hoveredElementSelector,
  makeCharacterByIdSelector
} from '../selectors';
import { checkMeleeAttackConstraints } from '../helpers/checkMeleeAttackConstraints';

import type { Element } from '../reducers/hoveredElementSlice';
import type { Trooper } from '../types';
import { CURSOR, ATTACK_TYPE, HOVERED_ELEMENT_TYPE } from '../constants';

interface Props {
  type: string;
  activeTrooper?: Trooper;
  selectedTrooper?: Trooper;
  attackers: Trooper[];
  defenders: Trooper[];
}

const detectCharacterCursor = ({
  activeTrooper,
  selectedTrooper,
  attackers,
  defenders
}: Props) => {
  if (!activeTrooper || !selectedTrooper) {
    return CURSOR.DEFAULT;
  }

  const isEnemySelected = activeTrooper.team !== selectedTrooper.team;
  const isDeadTrooperSelected = selectedTrooper.currentHealth <= 0;
  const isAllySelected = !isEnemySelected;

  if (isDeadTrooperSelected) {
    return CURSOR.DISABLED;
  }

  if (isEnemySelected) {
    if (activeTrooper.attackType === ATTACK_TYPE.RANGE) {
      return CURSOR.BOW;
    }

    if (activeTrooper.attackType === ATTACK_TYPE.SPLASH) {
      return CURSOR.SCROLL;
    }

    if (activeTrooper.attackType === ATTACK_TYPE.MELEE) {
      if (
        checkMeleeAttackConstraints({
          attackers,
          defenders,
          targetHero: selectedTrooper,
          activePlayer: activeTrooper
        })
      ) {
        return CURSOR.SWORD;
      } else {
        return CURSOR.DISABLED;
      }
    }
  }

  if (isAllySelected) {
    return CURSOR.DISABLED;
  }

  return CURSOR.DEFAULT;
};

function* updateCursor(hoveredElement: Element) {
  const isBattleFieldDisabled = yield* select(
    battlefieldDisabledStatusSelector
  );
  if (isBattleFieldDisabled) return;

  if (!hoveredElement) {
    yield* put(setCursorAction(CURSOR.DEFAULT));
    return;
  }

  const { id, type } = hoveredElement;

  if (type === HOVERED_ELEMENT_TYPE.CHARACTER) {
    const activePlayerId = yield* select(activePlayerIdSelector);
    const activeTrooper = yield* select(
      makeCharacterByIdSelector(activePlayerId)
    );
    const selectedTrooper = yield* select(makeCharacterByIdSelector(id));
    const attackers = yield* select(attackersSelector);
    const defenders = yield* select(defendersSelector);

    const nextCursor = detectCharacterCursor({
      type,
      activeTrooper,
      selectedTrooper,
      attackers,
      defenders
    });

    yield* put(setCursorAction(nextCursor));
  }
}

function* setCursorOnFinishTurn() {
  const hoveredElement = yield* select(hoveredElementSelector);
  yield* take(setActivePlayerAction);
  yield* call(updateCursor, hoveredElement);
}

function* setCursorOnHover({ payload: hoveredElement }: { payload: Element }) {
  yield* call(updateCursor, hoveredElement);
}

export function* cursorSagaWatcher() {
  yield takeLatest(setHoveredElementAction, setCursorOnHover);
  yield takeLatest(finishTrooperTurnAction, setCursorOnFinishTurn);
}
