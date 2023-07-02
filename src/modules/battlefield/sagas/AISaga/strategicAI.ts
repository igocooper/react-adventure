import { call, put, select } from 'typed-redux-saga';
import {
  activeTrooperSelector,
  enemyTeamNameSelector,
  enemyTeamSelector,
  initiativeSelector,
  meleeTrooperAllowedTargetsSelector
} from '../../selectors';
import { ATTACK_TYPE } from '../../constants';
import { clickOnEnemy, getRandomEnemyId } from './index';
import { getDamage } from 'modules/battlefield/helpers/getDamage';
import type { Trooper } from 'modules/battlefield/types';
import { getRandomArrayElement } from 'common/helpers';
import { blockClicked } from '../../actions';

const getTargetTrooper = (
  originalAllowedTargets: Trooper[],
  activeTrooper: Trooper,
  initiative: Array<{ id: Trooper['id'] }>
) => {
  const allowedTargets = getTargetTroopersBasedOnNumberOfAttackToKill(
    originalAllowedTargets,
    activeTrooper
  );

  if (allowedTargets[0] && allowedTargets.length === 1) {
    return allowedTargets[0].id;
  }

  const targets = getTargetTroopersBasedOnInitiative(
    allowedTargets,
    activeTrooper,
    initiative
  );

  if (targets[0] && targets.length === 1) {
    return targets[0].id;
  }

  return getTargetTrooperIdBasedOnMostLowHealth(targets);
};

const getTargetTroopersBasedOnInitiative = (
  allowedTargets: Trooper[],
  activeTrooper: Trooper,
  initiative: Array<{ id: Trooper['id'] }>
) => {
  const initiativeMap: Record<number, number> = initiative.reduce(
    (result, trooper, index) => {
      return {
        ...result,
        [trooper.id]: index
      };
    },
    {}
  );

  const filteredTargets = allowedTargets.filter((trooper) => {
    if (trooper.initiative === activeTrooper.initiative) {
      const activeTrooperInitiativeIndex = initiativeMap[activeTrooper.id]!;
      const trooperInitiativeIndex = initiativeMap[activeTrooper.id]!;

      return trooperInitiativeIndex > activeTrooperInitiativeIndex;
    }

    return trooper.initiative < activeTrooper.initiative;
  });

  return filteredTargets.length > 0 ? filteredTargets : allowedTargets;
};

const getTargetTrooperIdBasedOnMostLowHealth = (allowedTargets: Trooper[]) => {
  const { trooperIds } = allowedTargets.reduce(
    (
      result: {
        lowestCurrentHealth: number;
        trooperIds: Array<Trooper['id']>;
      },
      trooper: Trooper
    ) => {
      if (trooper.currentHealth < result.lowestCurrentHealth) {
        return {
          lowestCurrentHealth: trooper.currentHealth,
          trooperIds: [trooper.id]
        };
      }

      if (trooper.currentHealth === result.lowestCurrentHealth) {
        return {
          lowestCurrentHealth: trooper.currentHealth,
          trooperIds: [...result.trooperIds, trooper.id]
        };
      }

      return result;
    },
    {
      lowestCurrentHealth: Infinity,
      trooperIds: []
    }
  );

  if (trooperIds.length === 1) {
    return trooperIds[0];
  }

  return getRandomArrayElement(trooperIds);
};

const getTargetTroopersBasedOnNumberOfAttackToKill = (
  allowedTargets: Trooper[],
  activeTrooper: Trooper
) => {
  const [minDamage] = getDamage(activeTrooper.damage);
  const { troopers } = allowedTargets.reduce(
    (
      result: {
        minNumberOfAttackToKill: number;
        troopers: Trooper[];
      },
      trooper: Trooper
    ) => {
      const numberOfAttackToKill = trooper.currentHealth / minDamage;

      if (numberOfAttackToKill < result.minNumberOfAttackToKill) {
        return {
          minNumberOfAttackToKill: numberOfAttackToKill,
          troopers: [trooper]
        };
      }

      if (numberOfAttackToKill === result.minNumberOfAttackToKill) {
        return {
          minNumberOfAttackToKill: numberOfAttackToKill,
          troopers: [...result.troopers, trooper]
        };
      }

      return result;
    },
    {
      minNumberOfAttackToKill: 1000,
      troopers: []
    }
  );

  return troopers;
};

export function* strategicAI() {
  const activeTrooper = yield* select(activeTrooperSelector);
  const enemyTeamName = yield* select(enemyTeamNameSelector);
  const initiative = yield* select(initiativeSelector);

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

      const trooperId = getTargetTrooper(
        allowedTargets,
        activeTrooper,
        initiative
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

      const trooperId = getTargetTrooper(
        allowedTargets,
        activeTrooper,
        initiative
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
