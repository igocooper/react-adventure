import React from 'react';
import { DamageIndicator, DamageItem } from './styled';
import { useSelector } from 'react-redux';
import { damageEventsSelector } from 'modules/battlefield/selectors';

export const DamageIndicatorContainer = () => {
  const damageEvents = useSelector(damageEventsSelector);

  if (!damageEvents.length) {
    return null;
  }

  return (
    <DamageIndicator>
      {damageEvents.map(({ id, value, position, color }) => {
        return (
          <DamageItem key={id} $position={position} $color={color}>
            {value}
          </DamageItem>
        );
      })}
    </DamageIndicator>
  );
};
