import { call, put, select } from 'typed-redux-saga';
import {
  activeTrooperSelector,
  enemyTeamNameSelector,
  enemyTeamSelector,
  makeIsTrooperDeadSelector,
  meleeTrooperAllowedTargetsSelector
} from '../../selectors';
import { ATTACK_TYPE } from '../../constants';
import { setTrooperCurrentTargetId } from '../../reducers/troopsSlice';
import { clickOnEnemy, getRandomEnemyId } from './index';
import type { Trooper } from 'modules/battlefield/types';
import { blockClicked } from '../../actions';

function* setNewCurrentTarget(
  activeTrooper: Trooper,
  allowedTargets: Trooper[]
) {
  const randomId = yield* call(getRandomEnemyId, allowedTargets);

  yield* put(
    setTrooperCurrentTargetId({
      team: activeTrooper.team,
      activeTrooperId: activeTrooper.id,
      currentTargetId: randomId
    })
  );

  return randomId;
}

function* hitOrUpdateCurrentTarget({
  activeTrooper,
  allowedTargets,
  enemyTeamName
}: {
  activeTrooper: Trooper;
  allowedTargets: Trooper[];
  enemyTeamName: Trooper['team'];
}) {
  let targetId = activeTrooper.currentTargetId;

  if (!targetId) {
    targetId = yield* call(setNewCurrentTarget, activeTrooper, allowedTargets);
  }

  const isCurrentTargetDead = yield* select(
    makeIsTrooperDeadSelector(targetId)
  );

  if (isCurrentTargetDead) {
    targetId = yield* call(setNewCurrentTarget, activeTrooper, allowedTargets);
  }

  if (targetId) {
    yield* call(clickOnEnemy, {
      id: targetId,
      team: enemyTeamName
    });
  }
}

export function* determinedAI() {
  const activeTrooper = yield* select(activeTrooperSelector);
  const enemyTeamName = yield* select(enemyTeamNameSelector);

  if (!activeTrooper) return;

  switch (activeTrooper.attackType) {
    case ATTACK_TYPE.MELEE: {
      const allowedTargets = yield* select(meleeTrooperAllowedTargetsSelector);

      if (allowedTargets.length === 0) {
        yield* put(
          blockClicked({
            id: activeTrooper.id,
            team: activeTrooper.team
          })
        );
      }

      yield* call(hitOrUpdateCurrentTarget, {
        activeTrooper,
        allowedTargets,
        enemyTeamName
      });
      break;
    }

    case ATTACK_TYPE.RANGE:
    case ATTACK_TYPE.SPLASH: {
      const enemyTeam = yield* select(enemyTeamSelector);
      const allowedTargets = enemyTeam.filter(
        (trooper) => trooper.currentHealth > 0
      );

      yield* call(hitOrUpdateCurrentTarget, {
        activeTrooper,
        allowedTargets,
        enemyTeamName
      });

      break;
    }
    default:
      break;
  }
}
