import React from 'react';
import { DamageIndicator, DamageItem } from '../styled';
import { useSelector } from 'react-redux';
import { damageEventsSelector } from '../../../../selectors';

export const DamageIndicatorContainer = ({}) => {
  const damageEvents = useSelector(damageEventsSelector);

  if (!damageEvents.length) {
    return;
  }

  return (
    <DamageIndicator>
      {damageEvents.map(
        ({ id, damage, position, isCriticalDamage, isEvading }) => {
          return (
            <DamageItem
              key={id}
              $position={position}
              $isCriticalDamage={isCriticalDamage}
            >
              {isCriticalDamage && 'Crit: '}
              {!isEvading && damage}
              {isEvading && 'Miss'}
            </DamageItem>
          );
        }
      )}
    </DamageIndicator>
  );
};
