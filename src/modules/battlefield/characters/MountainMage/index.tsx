import React from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from '../../helpers/getCharacterProps';
import type { Trooper } from '../../types';
import { MagmaGeysers } from './MagmaGeysers';
import { FireBall } from './SpinningFireBall';

type Props = Pick<
  Trooper,
  | 'id'
  | 'appearance'
  | 'team'
  | 'equipment'
  | 'type'
  | 'damageType'
  | 'attackId'
  | 'position'
> & {
  onLoad?: (id: number) => void;
  containerNode?: HTMLElement;
};

export const MountainMage = ({
  onLoad,
  team,
  id,
  type,
  appearance,
  equipment,
  containerNode,
  damageType,
  attackId,
  position
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
      <MagmaGeysers containerNode={containerNode || document.body} />
      <FireBall attackId={attackId!} id={id} position={position} />
    </>
  );
};
