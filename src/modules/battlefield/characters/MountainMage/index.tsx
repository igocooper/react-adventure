import React from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from '../../helpers/getCharacterProps';
import type { Trooper } from '../../types';
import { MagmaGeysers } from './MagmaGeysers';
import { FireBall } from './SpinningFireBall';
import type { CommonCharacterProps } from '../CommonCharacter';

type Props = CommonCharacterProps &
  Pick<Trooper, 'attackId' | 'position'> & {
    containerNode?: HTMLElement;
  };

export const MountainMage = ({
  type,
  appearance,
  equipment,
  containerNode,
  damageType,
  attackId,
  position,
  id,
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
        id={id}
        {...restProps}
      />
      <MagmaGeysers containerNode={containerNode || document.body} />
      <FireBall attackId={attackId!} id={id} position={position} />
    </>
  );
};
