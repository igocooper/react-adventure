import { call, put, select } from 'typed-redux-saga';
import {
  activeTeamSelector,
  activeTrooperSelector,
  activeTeamNameSelector
} from '../../selectors';
import { clickOnTrooper, getRandomEnemyId } from './index';
import { SKILL } from 'common/constants';
import { blockClicked, setActiveSkill, waitClicked } from '../../actions';

export function* healerRandomAI() {
  const activeTrooper = yield* select(activeTrooperSelector);
  const teamName = yield* select(activeTeamNameSelector);

  if (!activeTrooper?.AIType) return;

  if (activeTrooper.skills[SKILL.HEAL]) {
    yield* put(setActiveSkill(activeTrooper.skills[SKILL.HEAL]));
    const allyTeam = yield* select(activeTeamSelector);
    const allowedTargets = allyTeam.filter(
      (trooper) =>
        trooper.currentHealth > 0 &&
        trooper.currentHealth !== trooper.health &&
        trooper.id !== activeTrooper.id
    );

    if (allowedTargets.length === 0) {
      // heal self lastly if no other ally is damaged
      if (activeTrooper.currentHealth !== activeTrooper.health) {
        yield* call(clickOnTrooper, {
          id: activeTrooper.id,
          team: teamName
        });
        return;
      }

      // wait maybe someone else will be damage later in round
      if (!activeTrooper.hasWaited) {
        yield* put(
          waitClicked({
            id: activeTrooper.id,
            team: activeTrooper.team
          })
        );

        return;
      }

      // nothing to do skip turn with block
      yield* put(
        blockClicked({
          id: activeTrooper.id,
          team: activeTrooper.team
        })
      );

      return;
    }

    const randomId = yield* call(getRandomEnemyId, allowedTargets);

    if (randomId) {
      yield* call(clickOnTrooper, {
        id: randomId,
        team: teamName
      });
    }

    return;
  }

  if (!activeTrooper.hasWaited) {
    yield* put(
      waitClicked({
        id: activeTrooper.id,
        team: activeTrooper.team
      })
    );

    return;
  }

  yield* put(
    blockClicked({
      id: activeTrooper.id,
      team: activeTrooper.team
    })
  );
}
