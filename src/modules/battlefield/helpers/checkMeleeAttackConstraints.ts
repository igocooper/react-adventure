import { convertToObjectByPosition } from './convertToObjectByPosition';
import type { Trooper } from '../types';

interface Props {
  attackers: Trooper[];
  defenders: Trooper[];
  targetHero?: Trooper;
  activePlayer?: Trooper;
}

export const checkMeleeAttackConstraints = ({
  attackers,
  defenders,
  targetHero,
  activePlayer
}: Props) => {
  if (!targetHero || !activePlayer) return false;

  const targetTeam =
    targetHero.team === 'attackers'
      ? convertToObjectByPosition<Trooper>(attackers)
      : convertToObjectByPosition<Trooper>(defenders);
  const allyTeam =
    activePlayer.team === 'attackers'
      ? convertToObjectByPosition<Trooper>(attackers)
      : convertToObjectByPosition<Trooper>(defenders);

  const noAllyFirstRow =
    (!allyTeam[1] || allyTeam[1].currentHealth <= 0) &&
    (!allyTeam[2] || allyTeam[2].currentHealth <= 0) &&
    (!allyTeam[3] || allyTeam[3].currentHealth <= 0);

  const noEnemyFirstRow =
    (!targetTeam[1] || targetTeam[1].currentHealth <= 0) &&
    (!targetTeam[2] || targetTeam[2].currentHealth <= 0) &&
    (!targetTeam[3] || targetTeam[3].currentHealth <= 0);

  if (activePlayer.position === 1) {
    switch (targetHero.position) {
      case 1:
      case 2:
        return true;
      case 3:
        return (
          (!targetTeam[1] || targetTeam[1].currentHealth <= 0) &&
          (!targetTeam[2] || targetTeam[2].currentHealth <= 0)
        );
      case 4:
      case 5:
        return (
          (!targetTeam[1] || targetTeam[1].currentHealth <= 0) &&
          (!targetTeam[2] || targetTeam[2].currentHealth <= 0) &&
          (!targetTeam[3] || targetTeam[3].currentHealth <= 0)
        );
      case 6:
        return (
          (!targetTeam[1] || targetTeam[1].currentHealth <= 0) &&
          (!targetTeam[2] || targetTeam[2].currentHealth <= 0) &&
          (!targetTeam[3] || targetTeam[3].currentHealth <= 0) &&
          (!targetTeam[4] || targetTeam[4].currentHealth <= 0) &&
          (!targetTeam[5] || targetTeam[5].currentHealth <= 0)
        );
      default:
        return false;
    }
  }

  if (activePlayer.position === 2) {
    switch (targetHero.position) {
      case 1:
      case 2:
      case 3:
        return true;
      case 4:
      case 5:
      case 6:
        return (
          (!targetTeam[1] || targetTeam[1].currentHealth <= 0) &&
          (!targetTeam[2] || targetTeam[2].currentHealth <= 0) &&
          (!targetTeam[3] || targetTeam[3].currentHealth <= 0)
        );
      default:
        return false;
    }
  }

  if (activePlayer.position === 3) {
    switch (targetHero.position) {
      case 1:
        return (
          (!targetTeam[3] || targetTeam[3].currentHealth <= 0) &&
          (!targetTeam[2] || targetTeam[2].currentHealth <= 0)
        );
      case 2:
      case 3:
        return true;
      case 4:
        return (
          (!targetTeam[1] || targetTeam[1].currentHealth <= 0) &&
          (!targetTeam[2] || targetTeam[2].currentHealth <= 0) &&
          (!targetTeam[3] || targetTeam[3].currentHealth <= 0) &&
          (!targetTeam[5] || targetTeam[5].currentHealth <= 0) &&
          (!targetTeam[6] || targetTeam[6].currentHealth <= 0)
        );
      case 5:
      case 6:
        return (
          (!targetTeam[1] || targetTeam[1].currentHealth <= 0) &&
          (!targetTeam[2] || targetTeam[2].currentHealth <= 0) &&
          (!targetTeam[3] || targetTeam[3].currentHealth <= 0)
        );

      default:
        return false;
    }
  }

  if (activePlayer.position === 4) {
    switch (targetHero.position) {
      case 1:
      case 2:
        return noAllyFirstRow;
      case 3:
        return (
          (!targetTeam[1] || targetTeam[1].currentHealth <= 0) &&
          (!targetTeam[2] || targetTeam[2].currentHealth <= 0) &&
          noAllyFirstRow
        );
      case 4:
      case 5:
        return noEnemyFirstRow && noAllyFirstRow;
      case 6:
        return (
          noEnemyFirstRow &&
          (!targetTeam[4] || targetTeam[4].currentHealth <= 0) &&
          (!targetTeam[5] || targetTeam[5].currentHealth <= 0) &&
          noAllyFirstRow
        );
      default:
        return false;
    }
  }

  if (activePlayer.position === 5) {
    switch (targetHero.position) {
      case 1:
      case 2:
      case 3:
        return noAllyFirstRow;
      case 4:
      case 5:
      case 6:
        return noEnemyFirstRow && noAllyFirstRow;
      default:
        return false;
    }
  }

  if (activePlayer.position === 6) {
    switch (targetHero.position) {
      case 1:
        return (
          (!targetTeam[3] || targetTeam[3].currentHealth <= 0) &&
          (!targetTeam[2] || targetTeam[2].currentHealth <= 0) &&
          noAllyFirstRow
        );
      case 2:
      case 3:
        return noAllyFirstRow;
      case 4:
        return (
          noAllyFirstRow &&
          noEnemyFirstRow &&
          (!targetTeam[5] || targetTeam[5].currentHealth <= 0) &&
          (!targetTeam[6] || targetTeam[6].currentHealth <= 0)
        );
      case 5:
      case 6:
        return noEnemyFirstRow && noAllyFirstRow;
      default:
        return false;
    }
  }

  return false;
};
