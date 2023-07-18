import React from 'react';
import type { Trooper } from 'modules/battlefield/types';
import { Container } from './styled';
import { SkillIcon } from 'common/components/SkillIcon';

type Props = Pick<Trooper, 'abilities'>;

export const Abilities = ({ abilities }: Props) => {
  if (!abilities || abilities.length === 0) {
    return null;
  }
  return (
    <>
      <p>Abilities:</p>
      <Container>
        {Object.values(abilities).map((ability) => (
          <SkillIcon src={ability.iconSrc} key={ability.name} />
        ))}
      </Container>
    </>
  );
};
