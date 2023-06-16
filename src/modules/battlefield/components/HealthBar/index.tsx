import React from 'react';
import * as styled from './styled';
import type { Trooper } from '../../types';

type CharacterProps = Pick<Trooper, 'currentHealth' | 'health'>;

export const HealthBar = ({ currentHealth, health }: CharacterProps) => {
  return (
    <styled.HealthBar>
      ♥️ {currentHealth} / {health}
    </styled.HealthBar>
  );
};
