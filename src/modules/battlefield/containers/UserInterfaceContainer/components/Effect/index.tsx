import React from 'react';
import { Container, DurationLabel, Image } from './styled';
import { Tooltip } from 'react-tooltip';

type EffectProps = {
  iconSrc: string;
  name: string;
  description: string;
  duration: number;
};

export const Effect = ({
  name,
  description,
  iconSrc,
  duration
}: EffectProps) => {
  return (
    <>
      <Container>
        <Image
          src={iconSrc}
          data-tooltip-id={name}
          data-tooltip-content={description}
        />
        {duration && <DurationLabel>{duration}</DurationLabel>}
      </Container>
      <Tooltip
        id={name}
        positionStrategy="fixed"
        style={{
          maxWidth: '150px'
        }}
      />
    </>
  );
};
