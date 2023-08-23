import React from 'react';
import type { Effect } from 'common/types';
import { IconSlot } from 'common/components/IconSlot';
import { Tooltip } from 'react-tooltip';

type Props = { effect: Effect };

export const EffectIcon = ({ effect }: Props) => {
  return (
    <>
      <IconSlot
        src={effect.iconSrc}
        data-tooltip-id={effect.name}
        data-tooltip-content={effect.description}
      />
      <Tooltip
        id={effect.name}
        positionStrategy="fixed"
        style={{
          maxWidth: '300px'
        }}
      />
    </>
  );
};
