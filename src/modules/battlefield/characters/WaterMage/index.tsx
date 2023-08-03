import React from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from '../../helpers/getCharacterProps';
import { IceSpikes } from './IceSpikes';
import { Kraken } from './Kraken';
import type { CommonCharacterProps } from '../CommonCharacter';

type Props = CommonCharacterProps & {
  containerNode?: HTMLElement;
};

export const WaterMage = ({
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
      <IceSpikes containerNode={containerNode || document.body} />
      <Kraken containerNode={containerNode || document.body} />
    </>
  );
};
