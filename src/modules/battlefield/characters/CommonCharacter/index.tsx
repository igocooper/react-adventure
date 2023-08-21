import React from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import type { OnLoadArgs } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from '../../helpers/getCharacterProps';
import type { Trooper } from '../../types';

export type CommonCharacterProps = Pick<
  Trooper,
  'id' | 'appearance' | 'team' | 'equipment' | 'type' | 'damageType' | 'sex'
> & {
  onLoad?: (props: OnLoadArgs) => void;
};

export const CommonCharacter = ({
  type,
  appearance,
  equipment,
  damageType,
  ...restProps
}: CommonCharacterProps) => {
  return (
    <CharacterAnimation
      {...getCharacterProps({
        type,
        appearance,
        equipment,
        damageType
      })}
      {...restProps}
    />
  );
};
