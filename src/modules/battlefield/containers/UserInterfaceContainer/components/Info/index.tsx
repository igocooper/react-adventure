import React from 'react';
import type { AttackType, Trooper } from 'modules/battlefield/types';
import { Container, Value, Item } from './styled';
import { ATTACK_TYPE } from 'common/constants';

type Props = {
  criticalChance?: Trooper['criticalChance'];
  evadeChance?: Trooper['evadeChance'];
} & Pick<
  Trooper,
  'currentHealth' | 'health' | 'damage' | 'attackType' | 'initiative'
>;

const getAttackTypeIcon = (attackType: AttackType) => {
  switch (attackType) {
    case ATTACK_TYPE.RANGE:
      return '🏹';
    case ATTACK_TYPE.SPLASH:
      return '💥';
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
  initiative,
  criticalChance,
  evadeChance
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
          {getAttackTypeIcon(attackType)} {damage}
        </Value>
      </Item>
      <Item>
        Initiative: <Value>{initiative}</Value>
      </Item>
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
    </Container>
  );
};
