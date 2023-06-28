import { call, select } from 'typed-redux-saga';
import {
  activeTrooperSelector,
  enemyTeamNameSelector,
  enemyTeamSelector,
  meleeTrooperAllowedTargetsSelector
} from '../../selectors';
import { ATTACK_TYPE } from '../../constants';
import { clickOnEnemy, getRandomEnemyId } from './index';

export function* randomAI() {
  const activeTrooper = yield* select(activeTrooperSelector);
  const enemyTeamName = yield* select(enemyTeamNameSelector);

  if (!activeTrooper?.AIType) return;

  switch (activeTrooper.attackType) {
    case ATTACK_TYPE.MELEE: {
      const allowedTargets = yield* select(meleeTrooperAllowedTargetsSelector);
      const randomId = yield* call(getRandomEnemyId, allowedTargets);

      if (randomId) {
        yield* call(clickOnEnemy, {
          id: randomId,
          team: enemyTeamName
        });
      }
      break;
    }

    case ATTACK_TYPE.RANGE:
    case ATTACK_TYPE.SPLASH: {
      const enemyTeam = yield* select(enemyTeamSelector);
      const allowedTargets = enemyTeam.filter(
        (trooper) => trooper.currentHealth > 0
      );
      const randomId = yield* call(getRandomEnemyId, allowedTargets);

      if (randomId) {
        yield* call(clickOnEnemy, {
          id: randomId,
          team: enemyTeamName
        });
      }
      break;
    }
    default:
      break;
  }
}
