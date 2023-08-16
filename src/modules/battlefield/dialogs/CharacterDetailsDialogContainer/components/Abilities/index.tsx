import React from 'react';
import type { Trooper } from 'modules/battlefield/types';
import { Container, Heading } from './styled';
import { SkillIcon } from 'common/components/SkillIcon';
import { Tooltip } from 'react-tooltip';

type Props = Pick<Trooper, 'abilities'>;

export const Abilities = ({ abilities }: Props) => {
  if (!abilities || abilities.length === 0) {
    return null;
  }
  return (
    <>
      <Heading>Abilities:</Heading>
      <Container>
        {abilities.map((ability, index) => (
          <div key={`${ability.name}-${index}`}>
            <SkillIcon
              src={ability.iconSrc}
              key={ability.name}
              data-tooltip-id={ability.name}
              data-tooltip-content={ability.description}
            />
            <Tooltip
              id={ability.name}
              key={`${ability.name}-${index}-tooltip`}
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
