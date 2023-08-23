import React from 'react';
import type { Effect as EffectType } from 'common/types';
import { useStackedEffects } from 'modules/battlefield/hooks';
import { Container } from './styled';
import { EffectStack } from '../EffectStack';
import { Effect } from '../Effect';

type EffectsProps = {
  effects: EffectType[];
};

export const Effects = ({ effects }: EffectsProps) => {
  const stackedEffects = useStackedEffects(effects);

  return (
    <Container>
      {Object.entries(stackedEffects).map(([effectName, entry], index) => {
        if (Array.isArray(entry)) {
          return <EffectStack key={`${effectName}-${index}`} effects={entry} />;
        }

        const { name, iconSrc, duration, description } = entry;

        return (
          <Effect
            iconSrc={iconSrc}
            key={`${name}-${index}`}
            duration={duration}
            description={description}
            name={name}
          />
        );
      })}
    </Container>
  );
};
