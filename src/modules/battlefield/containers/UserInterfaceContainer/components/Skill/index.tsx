import React from 'react';
import { SkillIcon, Container, CoolDown } from './styled';
import type { Skill as SkillType } from 'common/types';
import SFX from 'modules/SFX';

type SkillProps = SkillType & {
  active?: boolean;
  onClick: (skill: SkillType) => void;
};

export const Skill = ({ active, onClick, ...skill }: SkillProps) => {
  const disabled = Boolean(skill.currentCoolDown);
  const fillPercentage = skill.currentCoolDown
    ? (skill.currentCoolDown / skill.coolDown) * 100
    : 100;
  return (
    <Container onMouseOver={SFX.hover.play.bind(SFX.hover)}>
      <SkillIcon
        src={skill.iconSrc}
        active={active}
        disabled={disabled}
        onClick={(event: MouseEvent) => {
          event.stopPropagation();
          if (!disabled) {
            onClick(skill);
          }
        }}
      />
      {Boolean(skill.currentCoolDown) && (
        <CoolDown fillPercentage={fillPercentage}>
          {skill.currentCoolDown}
        </CoolDown>
      )}
    </Container>
  );
};
