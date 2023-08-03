import React from 'react';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from '../../helpers/getCharacterProps';
import { MountainArcherArrow } from './MountainArcherArrow';
import type { CommonCharacterProps } from '../CommonCharacter';

export const MountainArcher = ({
  type,
  appearance,
  equipment,
  damageType,
  ...restProps
}: CommonCharacterProps) => {
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
      <MountainArcherArrow />
    </>
  );
};
