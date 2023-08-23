import React from 'react';
import { EffectTooltipContent } from 'modules/battlefield/components/EffectTooltipContent';
import { Tooltip } from 'react-tooltip';
import type { Effect } from 'common/types';
import { IconSlot } from 'common/components/IconSlot';

type EffectIconsStackProps = {
  effects: Effect[];
};

export const EffectIconsStack = ({ effects }: EffectIconsStackProps) => {
  // we get description from longest effect
  const { description, name, iconSrc } = effects.reduce(
    (longestEffect, effect) => {
      return effect.duration > longestEffect.duration ? effect : longestEffect;
    },
    {
      duration: 0,
      description: '',
      name: '',
      iconSrc: effects?.[0]?.iconSrc || ''
    }
  );
  const tooltipId = `${name}-stack-icons`;

  return (
    <>
      <IconSlot
        src={iconSrc}
        data-tooltip-id={tooltipId}
        data-tooltip-content={description}
      />
      <Tooltip
        id={tooltipId}
        positionStrategy="fixed"
        style={{
          maxWidth: '300px'
        }}
        render={EffectTooltipContent(effects)}
      />
    </>
  );
};
