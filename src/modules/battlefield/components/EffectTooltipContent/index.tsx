import React from 'react';
import { Colored, StackedEffectInfo, Description } from './styled';
import { displayDuration } from 'common/helpers';
import type { Effect } from 'common/types';

type Props = {
  content: Nullable<string>;
  activeAnchor: Nullable<HTMLElement>;
};
export const EffectTooltipContent =
  (effects: Effect[]) =>
  ({ content }: Props) => {
    return (
      <div>
        <Description>{content}</Description>
        <StackedEffectInfo>
          {effects.map((effect, index) => (
            <div key={`${effect.name}-${index}-${effect.duration}`}>
              Effect #{index + 1}:{' '}
              <Colored
                dangerouslySetInnerHTML={{
                  __html: effect.stackInfo
                    ? effect.stackInfo(effect.duration)
                    : `(Duration: ${displayDuration(effect.duration)})`
                }}
              />
            </div>
          ))}
        </StackedEffectInfo>
      </div>
    );
  };

EffectTooltipContent.displayName = 'EffectTooltipContent';
