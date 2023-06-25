import { takeLatest, select, put, call } from 'typed-redux-saga/macro';
import {
  performAITurn as performAITurnAction,
  trooperClicked,
  setHoveredElement
} from '../../actions';
import { activeTrooperSelector } from '../../selectors';

import type { Trooper } from '../../types';

import { AI_TYPE, HOVERED_ELEMENT_TYPE } from '../../constants';
import { getRandomNumberInRange } from 'common/helpers';
import { randomAI } from './randomAI';
import { determinedAI } from './determinedAI';

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
  const randomIndex = getRandomNumberInRange(1, allowedTargets.length) - 1;
  return allowedTargets[randomIndex]?.id;
}

function* performAITurn() {
  const activeTrooper = yield* select(activeTrooperSelector);

  if (!activeTrooper?.AItype) return;

  switch (activeTrooper.AItype) {
    case AI_TYPE.RANDOM: {
      yield* call(randomAI);
      break;
    }
    case AI_TYPE.DETERMINED: {
      yield* call(determinedAI);
      break;
    }
    default:
      break;
  }
}

export function* AISagaWatcher() {
  yield takeLatest(performAITurnAction, performAITurn);
}
