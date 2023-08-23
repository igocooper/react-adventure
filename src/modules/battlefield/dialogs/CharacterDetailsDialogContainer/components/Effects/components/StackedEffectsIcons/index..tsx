import React from 'react';
import { Container, Heading } from './styled';
import type { EffectName, Effect } from 'common/types';
import { EffectIconsStack } from '../EffectIconsStack';
import { EffectIcon } from '../EffectIcon';

type Props = {
  stackedEffects: {
    [K in EffectName]?: Effect | Effect[];
  };
  title: string;
};
export const StackedEffectsIcons = ({ stackedEffects, title }: Props) => {
  return (
    <>
      <Heading>{title}</Heading>
      <Container>
        {Object.entries(stackedEffects).map(([effectName, entry], index) => {
          if (Array.isArray(entry)) {
            return (
              <EffectIconsStack
                key={`${effectName}-${index}`}
                effects={entry}
              />
            );
          }

          const { name } = entry;

          return <EffectIcon key={`${name}-${index}`} effect={entry} />;
        })}
      </Container>
    </>
  );
};
