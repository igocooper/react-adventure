import React from 'react';
import { Border, Icon } from './styled';

type Props = {
  src: string;
};

export const IconSlot = ({ src, ...props }: Props) => {
  return (
    <Border {...props}>
      <Icon src={src} />
    </Border>
  );
};
