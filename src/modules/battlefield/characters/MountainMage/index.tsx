import React from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from '../../helpers/getCharacterProps';
import type { Trooper } from '../../types';
import { MagmaGeysers } from './MagmaGeysers';
import { FireBall } from './FireBall';

type Props = Pick<
  Trooper,
  'id' | 'appearance' | 'team' | 'equipment' | 'type' | 'damageType'
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
  containerNode,
  damageType
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
        id={id}
        team={team}
        onLoad={onLoad}
      />
      <MagmaGeysers containerNode={containerNode} />
      <FireBall id={id} />
    </>
  );
};
