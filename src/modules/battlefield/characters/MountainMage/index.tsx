import React from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from '../../helpers/getCharacterProps';
import type { Trooper } from '../../types';
import { MagmaGeysers } from './MagmaGeysers';

type Props = Pick<
  Trooper,
  'id' | 'appearance' | 'team' | 'equipment' | 'type'
> & {
  onLoad: (id: number) => void;
  containerNode: HTMLElement;
};

export const MountainMage = ({
  onLoad,
  team,
  id,
  type,
  appearance,
  equipment,
  containerNode
}: Props) => {
  return (
    <>
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
      <MagmaGeysers containerNode={containerNode} />
    </>
  );
};
