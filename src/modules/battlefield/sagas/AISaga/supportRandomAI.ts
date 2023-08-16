import { call, put, select } from 'typed-redux-saga';
import { SKILL, EFFECT } from 'common/constants';
import {
  activeTeamSelector,
  activeTrooperSelector,
  activeTeamNameSelector
} from '../../selectors';
import { clickOnTrooper, getRandomEnemyId } from './index';
import { blockClicked, setActiveSkill, waitClicked } from '../../actions';

export function* supportRandomAI() {
  const activeTrooper = yield* select(activeTrooperSelector);
  const teamName = yield* select(activeTeamNameSelector);

  if (!activeTrooper?.AIType) return;

  if (activeTrooper.skills[SKILL.MIGHT]) {
    yield* put(setActiveSkill(activeTrooper.skills[SKILL.MIGHT]));
    const allyTeam = yield* select(activeTeamSelector);
    const allowedTargets = allyTeam.filter(
      (trooper) =>
        trooper.currentHealth > 0 &&
        trooper.id !== activeTrooper.id &&
        !trooper.effects.find((effect) => effect.name === EFFECT.MIGHT)
    );

    if (allowedTargets.length === 0) {
      // buff self lastly if no other ally can be buffed and not buffed itself
      if (
        !activeTrooper.effects.find((effect) => effect.name === EFFECT.MIGHT)
      ) {
        yield* call(clickOnTrooper, {
          id: activeTrooper.id,
          team: teamName
        });
        return;
      }

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
