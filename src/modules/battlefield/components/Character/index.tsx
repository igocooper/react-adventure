import React from 'react';
import { useDispatch } from 'store/hooks';
import { setHoveredElement } from '../../actions';
import * as styled from './styled';
import { HOVERED_ELEMENT_TYPE } from '../../constants';

interface CharacterProps {
  id: number;
  type: string;
}

export const Character = ({ type, id }: CharacterProps) => {
  const dispatch = useDispatch();
  return (
    <styled.Character
      onMouseEnter={() => {
        dispatch(
          setHoveredElement({ id, type: HOVERED_ELEMENT_TYPE.CHARACTER })
        );
      }}
      onMouseLeave={() => {
        dispatch(setHoveredElement(null));
      }}
      $type={type}
    />
  );
};
