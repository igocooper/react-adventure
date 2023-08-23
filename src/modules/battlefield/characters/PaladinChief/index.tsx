import React from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from '../../helpers/getCharacterProps';
import { DivineHeal } from './DivineHeal';
import type { CommonCharacterProps } from '../CommonCharacter';

type Props = CommonCharacterProps & {
  containerNode?: HTMLElement;
};

export const PaladinChief = ({
  type,
  appearance,
  equipment,
  containerNode,
  damageType,
  ...restProps
}: Props) => {
  return (
    <>
      <CharacterAnimation
        {...getCharacterProps({
          type,
          appearance,
          equipment,
          damageType
        })}
        {...restProps}
      />
      <DivineHeal containerNode={containerNode || document.body} />
    </>
  );
};
