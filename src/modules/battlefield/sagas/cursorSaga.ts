import { takeLatest, select, put } from 'typed-redux-saga/macro';
import {
  setHoveredElement as setHoveredElementAction,
  setCursor as setCursorAction
} from '../actions';
import {
  activePlayerIdSelector,
  attackersSelector,
  battlefieldDisabledStatusSelector,
  defendersSelector,
  makeCharacterByIdSelector
} from '../selectors';
import { checkMeleeAttackConstraints } from '../helpers/check-melee-attack-constraints';

import type { Element } from '../reducers/hoveredElementSlice';
import type { Troop } from '../types';

type Props = {
  type: string;
  activePlayer?: Troop;
  selectedPlayer?: Troop;
  attackers: Array<Troop>;
  defenders: Array<Troop>;
};

const detectCursor = ({
  type,
  activePlayer,
  selectedPlayer,
  attackers,
  defenders
}: Props) => {
  if (!activePlayer || !selectedPlayer) {
    return 'default';
  }

  if (type === 'character') {
    const isEnemy = activePlayer.team !== selectedPlayer.team;
    const isDead = selectedPlayer.currentHealth <= 0;

    if (isDead) {
      return 'disabled';
    }
    if (isEnemy) {
      if (activePlayer.attackType === 'range') {
        return 'bow';
      }
      if (activePlayer.attackType === 'splash') {
        return 'scroll';
      }
      if (activePlayer.attackType === 'melee') {
        if (
          checkMeleeAttackConstraints({
            attackers,
            defenders,
            targetHero: selectedPlayer,
            activePlayer
          })
        ) {
          return 'sword';
        } else {
          return 'disabled';
        }
      }
    }

    if (!isEnemy) {
      return 'default';
    }
  }
  return 'default';
};

function* setCursor({ payload }: { payload: Element }) {
  const isBattleFieldDisabled = yield* select(
    battlefieldDisabledStatusSelector
  );
  if (isBattleFieldDisabled) return;
  if (!payload) {
    yield* put(setCursorAction('default'));
    return;
  }
  const { id, type } = payload;
  const activePlayerId = yield* select(activePlayerIdSelector);
  const activePlayer = yield* select(makeCharacterByIdSelector(activePlayerId));
  const selectedPlayer = yield* select(makeCharacterByIdSelector(id));
  const attackers = yield* select(attackersSelector);
  const defenders = yield* select(defendersSelector);

  const nextCursor = detectCursor({
    type,
    activePlayer,
    selectedPlayer,
    attackers,
    defenders
  });
  yield* put(setCursorAction(nextCursor));
}

export function* cursorSagaWatcher() {
  yield takeLatest(setHoveredElementAction, setCursor);
}
