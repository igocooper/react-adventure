import React from 'react';
import type { Trooper } from 'modules/battlefield/types';
import { Container, Heading } from './styled';
import { SkillIcon } from 'common/components/SkillIcon';
import { EFFECT_TYPE } from 'common/constants';
import type { Effect } from 'common/types';
import { Tooltip } from 'react-tooltip';

type Props = Pick<Trooper, 'effects'>;

export const Effects = ({ effects }: Props) => {
  if (!effects || effects.length === 0) {
    return null;
  }

  const { curses, buffs } = effects.reduce(
    (result, effect) => {
      if (effect.type === EFFECT_TYPE.CURSE) {
        result.curses.push(effect);
      }

      if (effect.type === EFFECT_TYPE.BUFF) {
        result.buffs.push(effect);
      }

      return result;
    },
    {
      curses: [] as Effect[],
      buffs: [] as Effect[]
    }
  );

  return (
    <>
      {buffs.length !== 0 && (
        <>
          <Heading>Buffs:</Heading>
          <Container>
            {buffs.map((effect, index) => (
              <div key={`${effect.name}-${index}`}>
                <SkillIcon
                  src={effect.iconSrc}
                  key={effect.name}
                  data-tooltip-id={effect.name}
                  data-tooltip-content={effect.description}
                />
                <Tooltip
                  id={effect.name}
                  key={`${effect.name}-${index}-tooltip`}
                  positionStrategy="fixed"
                  style={{
                    maxWidth: '300px'
                  }}
                />
              </div>
            ))}
          </Container>
        </>
      )}
      {curses.length !== 0 && (
        <>
          <Heading>Curses:</Heading>
          <Container>
            {curses.map((effect, index) => (
              <div key={`${effect.name}-${index}`}>
                <SkillIcon
                  src={effect.iconSrc}
                  key={effect.name}
                  data-tooltip-id={effect.name}
                  data-tooltip-content={effect.description}
                />
                <Tooltip
                  id={effect.name}
                  key={`${effect.name}-${index}-tooltip`}
                  positionStrategy="fixed"
                  style={{
                    maxWidth: '300px'
                  }}
                />
              </div>
            ))}
          </Container>
        </>
      )}
    </>
  );
};
