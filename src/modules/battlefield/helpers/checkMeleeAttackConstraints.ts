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

  if (activePlayer.position === 1) {
    if (targetHero.position === 1) {
      return true;
    } else if (targetHero.position === 2) {
      return true;
    } else if (
      targetHero.position === 3 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 4 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 5 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 6 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      targetTeam[4] &&
      targetTeam[4].currentHealth <= 0 &&
      targetTeam[5] &&
      targetTeam[5].currentHealth <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  if (activePlayer.position === 2) {
    if (targetHero.position === 1) {
      return true;
    } else if (targetHero.position === 2) {
      return true;
    } else if (targetHero.position === 3) {
      return true;
    } else if (
      targetHero.position === 4 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 5 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 6 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  if (activePlayer.position === 3) {
    if (targetHero.position === 3) {
      return true;
    } else if (targetHero.position === 2) {
      return true;
    } else if (
      targetHero.position === 1 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 6 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 5 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 4 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      targetTeam[5] &&
      targetTeam[5].currentHealth <= 0 &&
      targetTeam[6] &&
      targetTeam[6].currentHealth <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  if (activePlayer.position === 4) {
    if (
      targetHero.position === 1 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 2 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 3 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 4 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 5 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 6 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      targetTeam[4] &&
      targetTeam[4].currentHealth <= 0 &&
      targetTeam[5] &&
      targetTeam[5].currentHealth <= 0 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  if (activePlayer.position === 5) {
    if (
      targetHero.position === 1 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 2 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 3 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 4 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 5 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 6 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  if (activePlayer.position === 6) {
    if (
      targetHero.position === 3 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 2 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 1 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 6 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 5 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else if (
      targetHero.position === 4 &&
      targetTeam[1] &&
      targetTeam[1].currentHealth <= 0 &&
      targetTeam[2] &&
      targetTeam[2].currentHealth <= 0 &&
      targetTeam[3] &&
      targetTeam[3].currentHealth <= 0 &&
      targetTeam[5] &&
      targetTeam[5].currentHealth <= 0 &&
      targetTeam[6] &&
      targetTeam[6].currentHealth <= 0 &&
      allyTeam[1] &&
      allyTeam[1].currentHealth <= 0 &&
      allyTeam[2] &&
      allyTeam[2].currentHealth <= 0 &&
      allyTeam[3] &&
      allyTeam[3].currentHealth <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
