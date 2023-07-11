import type { RootState } from 'store';
import { createSelector } from 'reselect';
import { checkMeleeAttackConstraints } from './helpers/checkMeleeAttackConstraints';
import { TROOPER_TEAM } from './constants';
import type { Trooper } from './types';

export const battlefieldSelector = (state: RootState) => state.battleField;

export const roundStateSelector = createSelector(
  battlefieldSelector,
  (battleField) => battleField.round
);

export const initiativeSelector = createSelector(
  roundStateSelector,
  (round) => round.initiative
);

export const roundSelector = createSelector(
  roundStateSelector,
  (state) => state.round
);

export const activePlayerSelector = createSelector(
  roundStateSelector,
  (state) => state.activePlayer
);

export const activePlayerIdSelector = createSelector(
  activePlayerSelector,
  (activePlayer) => activePlayer.id
);

export const activePlayerIndexSelector = createSelector(
  activePlayerSelector,
  (activePlayer) => activePlayer.index
);

export const troopsSelector = createSelector(
  battlefieldSelector,
  (battleField) => battleField.troops
);

export const activeTrooperSelector = createSelector(
  activePlayerIdSelector,
  troopsSelector,
  (id, troops) =>
    troops.attackers.find((attacker) => attacker.id === id) ||
    troops.defenders.find((defender) => defender.id === id)
);

export const attackersSelector = createSelector(
  troopsSelector,
  (troops) => troops.attackers
);

export const defendersSelector = createSelector(
  troopsSelector,
  (troops) => troops.defenders
);

export const battleFieldTroopersToLoadSelector = createSelector(
  attackersSelector,
  defendersSelector,
  (attackers, defenders) => {
    return [...attackers, ...defenders].reduce((result, trooper) => {
      return {
        ...result,
        [trooper.id]: false
      };
    }, {});
  }
);

export const makeCharacterByIdSelector = (id: number) =>
  createSelector(
    troopsSelector,
    (troops) =>
      troops.attackers.find((attacker) => attacker.id === id) ||
      troops.defenders.find((defender) => defender.id === id)
  );

export const makeIsTrooperDeadSelector = (id: Trooper['currentTargetId']) =>
  createSelector(troopsSelector, (troops) => {
    const trooper =
      troops.attackers.find((attacker) => attacker.id === id) ||
      troops.defenders.find((defender) => defender.id === id);

    if (!trooper) {
      return true;
    }

    return trooper.currentHealth <= 0;
  });

export const makeCanMeleeTrooperAttackSelector = (id: number) =>
  createSelector(
    activeTrooperSelector,
    attackersSelector,
    defendersSelector,
    (activeTrooper, attackers, defenders) => {
      const selectedTrooper =
        attackers.find((attacker) => attacker.id === id) ||
        defenders.find((defender) => defender.id === id);

      return checkMeleeAttackConstraints({
        attackers,
        defenders,
        targetHero: selectedTrooper,
        activePlayer: activeTrooper
      });
    }
  );

export const enemyTeamNameSelector = createSelector(
  activeTrooperSelector,
  (activeTrooper) => {
    return activeTrooper?.team === TROOPER_TEAM.ATTACKERS
      ? TROOPER_TEAM.DEFENDERS
      : TROOPER_TEAM.ATTACKERS;
  }
);

export const activeTeamNameSelector = createSelector(
  activeTrooperSelector,
  (activeTrooper) => {
    return activeTrooper?.team || TROOPER_TEAM.ATTACKERS;
  }
);

export const activeTeamSelector = createSelector(
  activeTrooperSelector,
  attackersSelector,
  defendersSelector,
  (activeTrooper, attackers, defenders) => {
    return activeTrooper?.team === TROOPER_TEAM.ATTACKERS
      ? attackers
      : defenders;
  }
);

export const enemyTeamSelector = createSelector(
  activeTrooperSelector,
  attackersSelector,
  defendersSelector,
  (activeTrooper, attackers, defenders) => {
    return activeTrooper?.team === TROOPER_TEAM.ATTACKERS
      ? defenders
      : attackers;
  }
);

export const meleeTrooperAllowedTargetsSelector = createSelector(
  activeTrooperSelector,
  enemyTeamSelector,
  attackersSelector,
  defendersSelector,
  (activeTrooper, enemyTeam, attackers, defenders) => {
    return enemyTeam.filter(
      (enemyTrooper) =>
        enemyTrooper.currentHealth > 0 &&
        checkMeleeAttackConstraints({
          attackers,
          defenders,
          targetHero: enemyTrooper,
          activePlayer: activeTrooper
        })
    );
  }
);

export const uiSelector = createSelector(
  battlefieldSelector,
  (battleField) => battleField.ui
);

export const hoveredElementStateSelector = createSelector(
  uiSelector,
  (ui) => ui.hoveredElement
);

export const hoveredElementSelector = createSelector(
  hoveredElementStateSelector,
  (state) => state.element
);

export const cursorSelector = createSelector(uiSelector, (ui) => ui.cursor);

export const battlefieldDisabledStatusSelector = createSelector(
  uiSelector,
  (ui) => ui.battlefieldDisabledStatus
);

export const battlefieldLoadedStatusStateSelector = createSelector(
  uiSelector,
  (ui) => ui.battlefieldLoadedStatus
);

export const damageEventsSelector = createSelector(
  uiSelector,
  (ui) => ui.damageEvents
);

export const battlefieldLoadedStatusSelector = createSelector(
  battlefieldLoadedStatusStateSelector,
  (ui) => ui.isLoaded
);

export const troopersToLoadSelector = createSelector(
  battlefieldLoadedStatusStateSelector,
  (ui) => ui.loadedTroopersIds
);

export const hoveredTrooperSelector = createSelector(
  hoveredElementSelector,
  troopsSelector,
  (hoveredElement, troops) => {
    return (
      troops.attackers.find((attacker) => attacker.id === hoveredElement?.id) ||
      troops.defenders.find((defender) => defender.id === hoveredElement?.id)
    );
  }
);
