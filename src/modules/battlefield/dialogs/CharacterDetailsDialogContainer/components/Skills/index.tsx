import React from 'react';
import type { Trooper } from 'modules/battlefield/types';
import { Container, Heading } from './styled';
import { SkillIcon } from 'common/components/SkillIcon';
import { Tooltip } from 'react-tooltip';

type Props = Pick<Trooper, 'skills'>;

export const Skills = ({ skills }: Props) => {
  if (!skills || Object.keys(skills).length === 0) {
    return null;
  }
  return (
    <>
      <Heading>Skills:</Heading>
      <Container>
        {Object.values(skills).map((skill, index) => (
          <div key={`${skill.name}-${index}`}>
            <SkillIcon
              src={skill.iconSrc}
              data-tooltip-id={skill.name}
              data-tooltip-content={skill.description}
            />
            <Tooltip
              id={skill.name}
              positionStrategy="fixed"
              style={{
                maxWidth: '300px'
              }}
            />
          </div>
        ))}
      </Container>
    </>
  );
};
