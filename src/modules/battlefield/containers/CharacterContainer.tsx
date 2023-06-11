import React, { useCallback } from 'react';
import { useDispatch } from 'store/hooks';
import { setHoveredElement, trooperClicked } from '../actions';
import type { Trooper } from '../types';
import { HOVERED_ELEMENT_TYPE } from '../constants';
import { Character } from '../components/Character';

type CharacterProps = Pick<Trooper, 'id' | 'type' | 'team'>;

export const CharacterContainer = ({ id, type, team }: CharacterProps) => {
  const dispatch = useDispatch();

  const handleMouseEnter = useCallback(() => {
    dispatch(setHoveredElement({ id, type: HOVERED_ELEMENT_TYPE.CHARACTER }));
  }, [dispatch]);

  const handleMouseLeave = useCallback(() => {
    dispatch(setHoveredElement(null));
  }, [dispatch]);

  const handleClick = useCallback(() => {
    dispatch(
      trooperClicked({
        id,
        team
      })
    );
  }, [dispatch, id, team]);

  return (
    <Character
      type={type}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
};
