import React from 'react';
import type { Trooper } from 'modules/battlefield/types';
import { Value, Item } from './styled';
import { DAMAGE_TYPE } from 'common/constants';
import { getDamageTypeIcon } from '../../helpers/getDamageTypeIcon';

type Props = Pick<Trooper, 'resistance'>;

export const Resistance = ({ resistance }: Props) => {
  if (!resistance || Object.keys(resistance).length === 0) return null;

  return (
    <>
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
      {resistance?.wind && (
        <Item>
          - Wind: {getDamageTypeIcon(DAMAGE_TYPE.WIND)}{' '}
          <Value>{resistance.wind} %</Value>
        </Item>
      )}
      {resistance?.earth && (
        <Item>
          - Earth: {getDamageTypeIcon(DAMAGE_TYPE.EARTH)}{' '}
          <Value>{resistance.earth} %</Value>
        </Item>
      )}
      {resistance?.light && (
        <Item>
          - Light: {getDamageTypeIcon(DAMAGE_TYPE.LIGHT)}{' '}
          <Value>{resistance.light} %</Value>
        </Item>
      )}
      {resistance?.dark && (
        <Item>
          - Dark: {getDamageTypeIcon(DAMAGE_TYPE.DARK)}{' '}
          <Value>{resistance.dark} %</Value>
        </Item>
      )}
      {resistance?.blood && (
        <Item>
          - Blood: {getDamageTypeIcon(DAMAGE_TYPE.BLOOD)}{' '}
          <Value>{resistance.blood} %</Value>
        </Item>
      )}
      {resistance?.poison && (
        <Item>
          - Poison: {getDamageTypeIcon(DAMAGE_TYPE.POISON)}{' '}
          <Value>{resistance?.poison} %</Value>
        </Item>
      )}
    </>
  );
};
