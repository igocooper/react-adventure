import React from 'react';
import { SkillIcon } from './styled';
import type { SkillName } from 'common/types';

type SkillProps = {
  iconSrc: string;
  name: SkillName;
  description: string;
  active?: boolean;
  onClick: (name: SkillName) => void;
};

export const Skill = ({ name, iconSrc, active, onClick }: SkillProps) => {
  return (
    <SkillIcon
      src={iconSrc}
      key={name}
      active={active}
      onClick={(event: MouseEvent) => {
        event.stopPropagation();
        onClick(name);
      }}
    />
  );
};
