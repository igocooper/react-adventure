import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'store/hooks';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import { getCharacterProps } from 'modules/battlefield/helpers/getCharacterProps';
import { setHoveredElement, trooperClicked } from '../../actions';
import type { Trooper } from '../../types';
import { HOVERED_ELEMENT_TYPE } from '../../constants';
import {
  activeTrooperSelector,
  battlefieldDisabledStatusSelector,
  hoveredElementSelector
} from '../../selectors';
import { Character, Tile } from './styled';
import { HealthBar } from '../../components/HealthBar';

type CharacterProps = Pick<
  Trooper,
  'id' | 'type' | 'team' | 'position' | 'currentHealth' | 'health'
>;

export const TileContainer = ({
  id,
  type,
  team,
  position,
  currentHealth,
  health
}: CharacterProps) => {
  const dispatch = useDispatch();
  const hoveredElement = useSelector(hoveredElementSelector);
  const isBattlefieldDisabled = useSelector(battlefieldDisabledStatusSelector);

  const handleMouseEnter = useCallback(() => {
    if (!isBattlefieldDisabled) {
      dispatch(setHoveredElement({ id, type: HOVERED_ELEMENT_TYPE.CHARACTER }));
    }
  }, [dispatch, isBattlefieldDisabled]);

  const handleMouseLeave = useCallback(() => {
    if (!isBattlefieldDisabled) {
      dispatch(setHoveredElement(null));
    }
  }, [dispatch, isBattlefieldDisabled]);

  const handleClick = useCallback(() => {
    dispatch(
      trooperClicked({
        id,
        team
      })
    );
  }, [dispatch, id, team]);

  const activeTrooper = useSelector(activeTrooperSelector);
  const active = id === activeTrooper?.id;
  const hovered = id === hoveredElement?.id;

  return (
    <Tile
      key={id}
      $position={position}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {hovered && <HealthBar currentHealth={currentHealth} health={health} />}
      <Character
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        $team={team}
        $enemy={!active && team !== activeTrooper?.team}
        $active={active}
        $hovered={hovered}
      >
        <CharacterAnimation {...getCharacterProps(type)} id={id} />
      </Character>
    </Tile>
  );
};
