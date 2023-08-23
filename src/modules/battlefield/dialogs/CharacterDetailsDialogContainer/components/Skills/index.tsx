import React from 'react';
import type { Trooper } from 'modules/battlefield/types';
import { Container, Heading } from './styled';
import { IconSlot } from 'common/components/IconSlot';
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
            <IconSlot
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
