import { call, select, put } from 'typed-redux-saga';
import {
  activeTrooperSelector,
  enemyTeamNameSelector,
  enemyTeamSelector,
  meleeTrooperAllowedTargetsSelector
} from '../../selectors';
import { ATTACK_TYPE } from '../../constants';
import { clickOnEnemy, getRandomEnemyId } from './index';
import { blockClicked } from '../../actions';

export function* randomAI() {
  const activeTrooper = yield* select(activeTrooperSelector);
  const enemyTeamName = yield* select(enemyTeamNameSelector);

  if (!activeTrooper?.AIType) return;

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
