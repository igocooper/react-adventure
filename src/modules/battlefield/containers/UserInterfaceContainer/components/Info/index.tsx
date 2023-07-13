import React from 'react';
import type { AttackType, Trooper } from 'modules/battlefield/types';
import { Container, Value, Item } from './styled';
import { ATTACK_TYPE, DAMAGE_TYPE } from 'common/constants';
import type { DamageType } from 'common/types';

type Props = {
  criticalChance?: Trooper['criticalChance'];
  evadeChance?: Trooper['evadeChance'];
} & Pick<
  Trooper,
  | 'currentHealth'
  | 'health'
  | 'damage'
  | 'damageType'
  | 'attackType'
  | 'hitChance'
  | 'defence'
  | 'resistance'
>;

const getDamageTypeIcon = (damageType: DamageType) => {
  switch (damageType) {
    case DAMAGE_TYPE.FIRE: {
      return '🔥';
    }

    case DAMAGE_TYPE.WATER: {
      return '💧';
    }

    case DAMAGE_TYPE.EARTH: {
      return '🍃';
    }

    case DAMAGE_TYPE.WIND: {
      return '🌪';
    }

    case DAMAGE_TYPE.LIGHT: {
      return '🌕';
    }

    case DAMAGE_TYPE.DARK: {
      return '🌑';
    }

    case DAMAGE_TYPE.POISON: {
      return '☠️';
    }

    case DAMAGE_TYPE.BLOOD: {
      return '🩸️';
    }
  }

  return '💩';
};

const getAttackTypeIcon = (attackType: AttackType, damageType: DamageType) => {
  switch (attackType) {
    case ATTACK_TYPE.RANGE:
      if (damageType === DAMAGE_TYPE.PHYSICAL) {
        return '🏹';
      }
      return `🪄:${getDamageTypeIcon(damageType)}`;
    case ATTACK_TYPE.SPLASH:
      return `💥:${getDamageTypeIcon(damageType)}`;
    case ATTACK_TYPE.MELEE:
      return '🗡';
    default:
      return '👊🏼';
  }
};

export const Info = ({
  currentHealth,
  health,
  damage,
  attackType,
  hitChance,
  criticalChance,
  evadeChance,
  defence,
  resistance,
  damageType
}: Props) => {
  return (
    <Container>
      <Item>
        HP: ♥️{' '}
        <Value>
          {currentHealth} / {health}
        </Value>
      </Item>
      <Item>
        Damage:{' '}
        <Value>
          {getAttackTypeIcon(attackType, damageType)} {damage}
        </Value>
      </Item>
      {hitChance && (
        <Item>
          Accuracy: <Value>{hitChance} %</Value>
        </Item>
      )}
      {criticalChance && (
        <Item>
          Critical: <Value>{criticalChance} %</Value>
        </Item>
      )}
      {evadeChance && (
        <Item>
          Evade: <Value>{evadeChance} %</Value>
        </Item>
      )}
      {defence && (
        <Item>
          Defence: <Value>{defence} %</Value>
        </Item>
      )}
      {resistance && Object.keys(resistance).length > 0 && (
        <Item>Resistance:</Item>
      )}
      {resistance?.fire && (
        <Item>
          - Fire: {getDamageTypeIcon(DAMAGE_TYPE.FIRE)}{' '}
          <Value>{resistance.fire} %</Value>
        </Item>
      )}
      {resistance?.water && (
        <Item>
          - Water: {getDamageTypeIcon(DAMAGE_TYPE.WATER)}{' '}
          <Value>{resistance?.water} %</Value>
        </Item>
      )}
      {resistance?.poison && (
        <Item>
          - Poison: {getDamageTypeIcon(DAMAGE_TYPE.POISON)}{' '}
          <Value>{resistance?.poison} %</Value>
        </Item>
      )}
    </Container>
  );
};
