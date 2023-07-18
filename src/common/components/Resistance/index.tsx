import React from 'react';
import type { Trooper } from 'modules/battlefield/types';
import { Value, Item, Container } from './styled';
import { DAMAGE_TYPE } from 'common/constants';
import { getDamageTypeIcon } from 'common/helpers/getDamageTypeIcon';

type Props = Pick<Trooper, 'resistance'>;

export const Resistance = ({ resistance = {} }: Props) => {
  return (
    <>
      <Item>Resistance:</Item>
      <Container>
        <div>
          <Item>
            - Fire: {getDamageTypeIcon(DAMAGE_TYPE.FIRE)}{' '}
            <Value>{resistance.fire || 0} %</Value>
          </Item>
          <Item>
            - Water: {getDamageTypeIcon(DAMAGE_TYPE.WATER)}{' '}
            <Value>{resistance?.water || 0} %</Value>
          </Item>
          <Item>
            - Wind: {getDamageTypeIcon(DAMAGE_TYPE.WIND)}{' '}
            <Value>{resistance.wind || 0} %</Value>
          </Item>
          <Item>
            - Earth: {getDamageTypeIcon(DAMAGE_TYPE.EARTH)}{' '}
            <Value>{resistance.earth || 0} %</Value>
          </Item>
        </div>
        <div>
          <Item>
            - Poison: {getDamageTypeIcon(DAMAGE_TYPE.POISON)}{' '}
            <Value>{resistance?.poison || 0} %</Value>
          </Item>
          <Item>
            - Blood: {getDamageTypeIcon(DAMAGE_TYPE.BLOOD)}{' '}
            <Value>{resistance.blood || 0} %</Value>
          </Item>
          <Item>
            - Light: {getDamageTypeIcon(DAMAGE_TYPE.LIGHT)}{' '}
            <Value>{resistance.light || 0} %</Value>
          </Item>
          <Item>
            - Dark: {getDamageTypeIcon(DAMAGE_TYPE.DARK)}{' '}
            <Value>{resistance.dark || 0} %</Value>
          </Item>
        </div>
      </Container>
    </>
  );
};
