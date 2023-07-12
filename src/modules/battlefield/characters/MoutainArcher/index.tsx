import React from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from '../../helpers/getCharacterProps';
import type { Trooper } from '../../types';
import { MountainArcherArrow } from './MountainArcherArrow';

type Props = Pick<
  Trooper,
  'id' | 'appearance' | 'team' | 'equipment' | 'type'
> & {
  onLoad: (id: number) => void;
};

export const MountainArcher = ({
  onLoad,
  team,
  id,
  type,
  appearance,
  equipment
}: Props) => {
  return (
    <>
      <CharacterAnimation
        {...getCharacterProps({
          type,
          appearance,
          equipment
        })}
        animationMap={{
          attack: 'shoot_with_bow',
          idle: 'idle_with_bow',
          hurt: 'hurt_with_bow',
          die: 'dying_with_bow',
          effected: 'effected_with_bow'
        }}
        id={id}
        team={team}
        onLoad={onLoad}
      />
      <MountainArcherArrow />
    </>
  );
};
