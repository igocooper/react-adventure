import React from 'react';
import type { Trooper } from 'modules/battlefield/types';
import { Container, Value, Item } from './styled';
import { getAttackTypeIcon } from 'common/helpers/getAttackTypeIcon';

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
      {Boolean(hitChance) && (
        <Item>
          Boolean(Accuracy: <Value>{hitChance} %</Value>
        </Item>
      )}
      {Boolean(criticalChance) && (
        <Item>
          Critical: <Value>{criticalChance} %</Value>
        </Item>
      )}
      {Boolean(evadeChance) && (
        <Item>
          Evade: <Value>{evadeChance} %</Value>
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
