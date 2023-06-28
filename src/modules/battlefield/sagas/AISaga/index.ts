import { takeLatest, select, put, call } from 'typed-redux-saga/macro';
import {
  performAITurn as performAITurnAction,
  trooperClicked,
  setHoveredElement
} from '../../actions';
import { activeTrooperSelector } from '../../selectors';

import type { Trooper } from '../../types';

import { AI_TYPE, HOVERED_ELEMENT_TYPE } from '../../constants';
import { getRandomArrayElement } from 'common/helpers';
import { randomAI } from './randomAI';
import { determinedAI } from './determinedAI';
import { strategicAI } from './strategicAI';

export function* clickOnEnemy({ id, team }: Pick<Trooper, 'id' | 'team'>) {
  yield* put(
    setHoveredElement({
      id,
      type: HOVERED_ELEMENT_TYPE.CHARACTER
    })
  );
  yield* put(
    trooperClicked({
      id,
      team
    })
  );
}

export function* getRandomEnemyId(allowedTargets: Trooper[]) {
  const randomTarget = getRandomArrayElement(allowedTargets);
  return randomTarget?.id;
}

function* performAITurn() {
  const activeTrooper = yield* select(activeTrooperSelector);

  if (!activeTrooper?.AIType) return;

  switch (activeTrooper.AIType) {
    case AI_TYPE.RANDOM: {
      yield* call(randomAI);
      break;
    }
    case AI_TYPE.DETERMINED: {
      yield* call(determinedAI);
      break;
    }
    case AI_TYPE.STRATEGIC: {
      yield* call(strategicAI);
      break;
    }
    default:
      break;
  }
}

export function* AISagaWatcher() {
  yield takeLatest(performAITurnAction, performAITurn);
}
