import { call, put, select, take, takeLatest } from 'typed-redux-saga/macro';
import {
  finishTrooperTurn as finishTrooperTurnAction,
  setActivePlayer as setActivePlayerAction,
  setActiveSkill as setActiveSkillAction,
  setCursor as setCursorAction,
  setHoveredElement as setHoveredElementAction
} from '../actions';
import {
  activeSkillSelector,
  activeTrooperSelector,
  attackersSelector,
  battlefieldDisabledStatusSelector,
  defendersSelector,
  hoveredElementSelector,
  makeCharacterByIdSelector
} from '../selectors';
import { checkMeleeAttackConstraints } from '../helpers/checkMeleeAttackConstraints';

import type { Element } from '../reducers/hoveredElementSlice';
import type { Trooper } from '../types';
import type { Skill } from 'common/types';
import { ATTACK_TYPE, CURSOR, DAMAGE_TYPE, TARGET } from 'common/constants';
import { HOVERED_ELEMENT_TYPE } from '../constants';

type Props = {
  type: string;
  activeTrooper?: Trooper;
  selectedTrooper?: Trooper;
  attackers: Trooper[];
  defenders: Trooper[];
  activeSkill: Nullable<Skill>;
};

const detectCharacterCursor = ({
  activeTrooper,
  selectedTrooper,
  attackers,
  defenders,
  activeSkill
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
    if (activeSkill !== null && activeSkill.target === TARGET.ALLY) {
      return CURSOR.DISABLED;
    }

    if (activeSkill !== null && activeSkill.target === TARGET.ENEMY) {
      if (activeSkill?.attackType === ATTACK_TYPE.MELEE) {
        if (
          checkMeleeAttackConstraints({
            attackers,
            defenders,
            targetHero: selectedTrooper,
            activePlayer: activeTrooper
          })
        ) {
          return CURSOR.HAND;
        } else {
          return CURSOR.DISABLED;
        }
      }

      if (
        activeSkill?.attackType === ATTACK_TYPE.RANGE ||
        activeSkill?.attackType === ATTACK_TYPE.SPLASH
      ) {
        return CURSOR.HAND;
      }
    }

    if (activeTrooper.attackType === ATTACK_TYPE.RANGE) {
      if (activeTrooper.damageType === DAMAGE_TYPE.PHYSICAL) {
        return CURSOR.BOW;
      }

      return CURSOR.WAND;
    }

    if (activeTrooper.attackType === ATTACK_TYPE.SPLASH) {
      return CURSOR.WAND;
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
    if (activeSkill !== null && activeSkill.target === TARGET.ALLY) {
      return CURSOR.HAND;
    }

    if (activeSkill !== null && activeSkill.target === TARGET.ENEMY) {
      return CURSOR.DISABLED;
    }

    if (activeTrooper.supportType !== undefined) {
      return CURSOR.WAND;
    }
    return CURSOR.DISABLED;
  }

  return CURSOR.DEFAULT;
};

function* updateCursor(hoveredElement: Element) {
  const isBattleFieldDisabled = yield* select(
    battlefieldDisabledStatusSelector
  );
  if (isBattleFieldDisabled) return;

  const activeSkill = yield* select(activeSkillSelector);

  if (activeSkill && !hoveredElement) {
    yield* put(setCursorAction(CURSOR.HAND));
    return;
  }

  if (!hoveredElement) {
    yield* put(setCursorAction(CURSOR.DEFAULT));
    return;
  }

  const { id, type } = hoveredElement;

  if (type === HOVERED_ELEMENT_TYPE.CHARACTER) {
    const activeTrooper = yield* select(activeTrooperSelector);
    const selectedTrooper = yield* select(makeCharacterByIdSelector(id));
    const attackers = yield* select(attackersSelector);
    const defenders = yield* select(defendersSelector);

    const nextCursor = detectCharacterCursor({
      type,
      activeTrooper,
      selectedTrooper,
      attackers,
      defenders,
      activeSkill
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

function* setCursorOnSkill() {
  yield* call(updateCursor, null);
}

export function* cursorSagaWatcher() {
  yield* takeLatest(setActiveSkillAction, setCursorOnSkill);
  yield* takeLatest(setHoveredElementAction, setCursorOnHover);
  yield* takeLatest(finishTrooperTurnAction, setCursorOnFinishTurn);
}
