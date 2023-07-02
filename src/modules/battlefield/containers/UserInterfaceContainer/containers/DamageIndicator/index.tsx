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
      {damageEvents.map(
        ({ id, damage, position, isCriticalDamage, isEvading, isPoison }) => {
          return (
            <DamageItem
              key={id}
              $position={position}
              $isCriticalDamage={isCriticalDamage}
              $miss={isEvading}
              $isPoison={isPoison}
            >
              {isCriticalDamage && !isEvading && 'Crit: '}
              {!isEvading && `-${damage}`}
              {isEvading && 'Miss'}
            </DamageItem>
          );
        }
      )}
    </DamageIndicator>
  );
};
