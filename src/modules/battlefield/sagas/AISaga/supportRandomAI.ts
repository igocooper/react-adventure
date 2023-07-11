import { call, put, select } from 'typed-redux-saga';
import {
  activeTeamSelector,
  activeTrooperSelector,
  activeTeamNameSelector
} from '../../selectors';
import { SUPPORT_TYPE } from 'common/constants';
import { clickOnTrooper, getRandomEnemyId } from './index';
import { blockClicked } from '../../actions';

export function* supportRandomAI() {
  const activeTrooper = yield* select(activeTrooperSelector);
  const teamName = yield* select(activeTeamNameSelector);

  if (!activeTrooper?.AIType) return;

  switch (activeTrooper.supportType) {
    case SUPPORT_TYPE.HEAL: {
      const allyTeam = yield* select(activeTeamSelector);
      const allowedTargets = allyTeam.filter(
        (trooper) =>
          trooper.currentHealth > 0 || trooper.currentHealth === trooper.health
      );

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
        yield* call(clickOnTrooper, {
          id: randomId,
          team: teamName
        });
      }

      break;
    }
    default:
      break;
  }
}
