import { put, select, takeLatest } from 'typed-redux-saga/macro';
import {
  setCursor as setCursorAction,
  setHoveredElement as setHoveredElementAction
} from '../actions';
import {
  activePlayerIdSelector,
  attackersSelector,
  battlefieldDisabledStatusSelector,
  defendersSelector,
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

function* setCursor({ payload: hoveredElement }: { payload: Element }) {
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

export function* cursorSagaWatcher() {
  yield takeLatest(setHoveredElementAction, setCursor);
}
