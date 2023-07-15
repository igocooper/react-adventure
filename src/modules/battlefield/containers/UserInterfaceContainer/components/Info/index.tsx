import React from 'react';
import type { Trooper } from 'modules/battlefield/types';
import { Container, Value, Item } from './styled';
import { getAttackTypeIcon } from '../../helpers/getAttackTypeIcon';
import { Resistance } from '../Resistance';

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
      <Resistance resistance={resistance} />
    </Container>
  );
};
