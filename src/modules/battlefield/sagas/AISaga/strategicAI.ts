import { call, select } from 'typed-redux-saga';
import {
  activeTrooperSelector,
  enemyTeamNameSelector,
  enemyTeamSelector,
  meleeTrooperAllowedTargetsSelector
} from '../../selectors';
import { ATTACK_TYPE } from '../../constants';
import { clickOnEnemy, getRandomEnemyId } from './index';
import { getDamage } from 'modules/battlefield/helpers/getDamage';
import type { Trooper } from 'modules/battlefield/types';

const getTargetTrooperIdBasedOnNumberOfAttackToKill = (
  allowedTargets: Trooper[],
  activeTrooper: Trooper
) => {
  const [minDamage] = getDamage(activeTrooper.damage);
  const { trooperId } = allowedTargets.reduce(
    (
      result: {
        minNumberOfAttackToKill: number;
        trooperId: Nullable<Trooper['id']>;
      },
      trooper: Trooper
    ) => {
      const numberOfAttackToKill = trooper.currentHealth / minDamage;

      if (numberOfAttackToKill < result.minNumberOfAttackToKill) {
        return {
          minNumberOfAttackToKill: numberOfAttackToKill,
          trooperId: trooper.id
        };
      }

      if (
        numberOfAttackToKill === result.minNumberOfAttackToKill &&
        activeTrooper.initiative > trooper.initiative
      ) {
        return {
          minNumberOfAttackToKill: numberOfAttackToKill,
          trooperId: trooper.id
        };
      }

      return result;
    },
    {
      minNumberOfAttackToKill: 1000,
      trooperId: null
    }
  );

  return trooperId;
};

export function* strategicAI() {
  const activeTrooper = yield* select(activeTrooperSelector);
  const enemyTeamName = yield* select(enemyTeamNameSelector);

  if (!activeTrooper?.AItype) return;

  switch (activeTrooper.attackType) {
    case ATTACK_TYPE.MELEE: {
      const allowedTargets = yield* select(meleeTrooperAllowedTargetsSelector);

      const trooperId = getTargetTrooperIdBasedOnNumberOfAttackToKill(
        allowedTargets,
        activeTrooper
      );

      if (trooperId) {
        yield* call(clickOnEnemy, {
          id: trooperId,
          team: enemyTeamName
        });
      }
      break;
    }

    case ATTACK_TYPE.RANGE: {
      const enemyTeam = yield* select(enemyTeamSelector);
      const allowedTargets = enemyTeam.filter(
        (trooper) => trooper.currentHealth > 0
      );

      const trooperId = getTargetTrooperIdBasedOnNumberOfAttackToKill(
        allowedTargets,
        activeTrooper
      );

      if (trooperId) {
        yield* call(clickOnEnemy, {
          id: trooperId,
          team: enemyTeamName
        });
      }

      break;
    }

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
