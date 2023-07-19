import React from 'react';
import { Slot, Health } from './styled';

type Props = {
  currentHealth: number;
  health: number;
};

export const HealthBar = ({ ...props }: Props) => {
  return (
    <Slot {...props}>
      <Health {...props} />
    </Slot>
  );
};
