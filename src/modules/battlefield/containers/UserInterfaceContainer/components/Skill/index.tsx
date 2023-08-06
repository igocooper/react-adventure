import React from 'react';
import { SkillIcon } from './styled';
import type { Skill as SkillType } from 'common/types';

type SkillProps = SkillType & {
  active?: boolean;
  onClick: (skill: SkillType) => void;
};

export const Skill = ({ active, onClick, ...skill }: SkillProps) => {
  return (
    <SkillIcon
      src={skill.iconSrc}
      active={active}
      onClick={(event: MouseEvent) => {
        event.stopPropagation();
        onClick(skill);
      }}
    />
  );
};
