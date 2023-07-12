import React from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from '../../helpers/getCharacterProps';
import type { Trooper } from '../../types';

type Props = Pick<
  Trooper,
  'id' | 'appearance' | 'team' | 'equipment' | 'type'
> & {
  onLoad: (id: number) => void;
};

export const CommonCharacter = ({
  onLoad,
  team,
  id,
  type,
  appearance,
  equipment
}: Props) => {
  return (
    <CharacterAnimation
      {...getCharacterProps({
        type,
        appearance,
        equipment
      })}
      id={id}
      team={team}
      onLoad={onLoad}
    />
  );
};
