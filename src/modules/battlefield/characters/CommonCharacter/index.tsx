import React from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from '../../helpers/getCharacterProps';
import type { Trooper } from '../../types';

type Props = Pick<
  Trooper,
  'id' | 'appearance' | 'team' | 'equipment' | 'type' | 'damageType'
> & {
  onLoad?: (id: number) => void;
};

export const CommonCharacter = ({
  onLoad,
  team,
  id,
  type,
  appearance,
  equipment,
  damageType
}: Props) => {
  return (
    <CharacterAnimation
      {...getCharacterProps({
        type,
        appearance,
        equipment,
        damageType
      })}
      id={id}
      team={team}
      onLoad={onLoad}
    />
  );
};
