import React from 'react';
import { Tooltip } from 'react-tooltip';
import { EffectTooltipContent } from 'modules/battlefield/components/EffectTooltipContent';
import type { Effect } from 'common/types';
import { Container, DurationLabel, Image } from './styled';

type EffectStackProps = {
  effects: Effect[];
};

export const EffectStack = ({ effects }: EffectStackProps) => {
  // we get description from longest effect
  const { duration, description, name, iconSrc } = effects.reduce(
    (longestEffect, effect) => {
      return effect.duration > longestEffect.duration ? effect : longestEffect;
    },
    { duration: 0, description: '', name: '', iconSrc: effects?.[0]?.iconSrc }
  );
  const tooltipId = `${name}-stack`;

  return (
    <>
      <Container>
        <Image
          src={iconSrc}
          data-tooltip-id={tooltipId}
          data-tooltip-content={description}
        />
        {duration && <DurationLabel>{duration}</DurationLabel>}
      </Container>
      <Tooltip
        id={tooltipId}
        positionStrategy="fixed"
        style={{
          maxWidth: '200px',
          zIndex: 900
        }}
        render={EffectTooltipContent(effects)}
      />
    </>
  );
};
