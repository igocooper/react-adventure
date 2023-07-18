import React from 'react';
import { Border, Icon } from './styled';

type Props = {
  src: string;
};

export const SkillIcon = ({ src }: Props) => {
  return (
    <Border>
      <Icon src={src} />
    </Border>
  );
};
