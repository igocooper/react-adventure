import React from 'react';
import { Container, DurationLabel, Image } from './styled';

interface EffectProps {
  iconSrc: string;
  duration: number;
}

export const Effect = ({ iconSrc, duration }: EffectProps) => {
  return (
    <Container>
      <Image src={iconSrc} />
      {duration && <DurationLabel>{duration}</DurationLabel>}
    </Container>
  );
};
