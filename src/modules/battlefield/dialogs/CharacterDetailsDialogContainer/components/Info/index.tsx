import React from 'react';
import type { Trooper } from 'modules/battlefield/types';
import { Container, Value, Item } from './styled';
import { getAttackTypeIcon } from 'common/helpers/getAttackTypeIcon';

type Props = Pick<
  Trooper,
  | 'currentHealth'
  | 'health'
  | 'damage'
  | 'damageType'
  | 'attackType'
  | 'hitChance'
  | 'defence'
  | 'resistance'
  | 'counterAttackChance'
  | 'criticalChance'
  | 'criticalMultiplier'
  | 'evadeChance'
  | 'supportType'
  | 'initiative'
>;

export const Info = ({
  currentHealth,
  health,
  damage,
  attackType,
  hitChance,
  criticalChance,
  evadeChance,
  defence,
  damageType,
  counterAttackChance,
  supportType,
  criticalMultiplier,
  initiative
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
      {supportType && (
        <Item>
          Support: <Value>{supportType}</Value>
        </Item>
      )}
      {initiative && (
        <Item>
          Initiative: <Value>{initiative}</Value>
        </Item>
      )}
      {criticalChance && (
        <Item>
          Critical: <Value>{criticalChance} %</Value>
        </Item>
      )}
      {criticalMultiplier && (
        <Item>
          Critical Power: <Value>{criticalMultiplier}</Value>
        </Item>
      )}
      {evadeChance && (
        <Item>
          Evade: <Value>{evadeChance} %</Value>
        </Item>
      )}
      {counterAttackChance && (
        <Item>
          Counter Attack: <Value>{counterAttackChance} %</Value>
        </Item>
      )}
      {defence && (
        <Item>
          Defence: <Value>{defence} %</Value>
        </Item>
      )}
    </Container>
  );
};
