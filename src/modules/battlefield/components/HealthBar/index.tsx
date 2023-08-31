import React from 'react';
import * as styled from './styled';
import type { Trooper } from '../../types';

type CharacterProps = Pick<Trooper, 'currentHealth' | 'health'>;

const Icon = ({ currentHealth }: { currentHealth: number }) => {
  return currentHealth === 0 ? <span>💀</span> : <span>❤️</span>;
};

export const HealthBar = ({ currentHealth, health }: CharacterProps) => {
  return (
    <styled.HealthBar>
      <Icon currentHealth={currentHealth} /> {currentHealth} / {health}
    </styled.HealthBar>
  );
};
