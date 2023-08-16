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
      {Boolean(hitChance) && (
        <Item>
          Accuracy: <Value>{hitChance} %</Value>
        </Item>
      )}
      {Boolean(initiative) && (
        <Item>
          Initiative: <Value>{initiative}</Value>
        </Item>
      )}
      {Boolean(criticalChance) && (
        <Item>
          Critical: <Value>{criticalChance} %</Value>
        </Item>
      )}
      {Boolean(criticalMultiplier) && (
        <Item>
          Critical Power: <Value>{criticalMultiplier}</Value>
        </Item>
      )}
      {Boolean(evadeChance) && (
        <Item>
          Evade: <Value>{evadeChance} %</Value>
        </Item>
      )}
      {Boolean(counterAttackChance) && (
        <Item>
          Counter Attack: <Value>{counterAttackChance} %</Value>
        </Item>
      )}
      {Boolean(defence) && (
        <Item>
          Defence: <Value>{defence} %</Value>
        </Item>
      )}
    </Container>
  );
};
