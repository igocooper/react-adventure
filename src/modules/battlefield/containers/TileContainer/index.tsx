import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'store/hooks';
import {
  setHoveredElement,
  trooperClicked,
  setTrooperLoadedStatus
} from '../../actions';
import type { Trooper } from '../../types';
import { HOVERED_ELEMENT_TYPE } from '../../constants';
import {
  activeTrooperSelector,
  battlefieldDisabledStatusSelector,
  hoveredElementSelector
} from '../../selectors';
import { Character, Tile } from './styled';
import { HealthBar } from '../../components/HealthBar';
import { EffectContainer } from '../EffectContainer';
import { registerTileNode } from '../../tilesNodesMap';
import { getCharacterByType } from '../../helpers/getCharacterByType';

type CharacterProps = Pick<
  Trooper,
  | 'id'
  | 'type'
  | 'team'
  | 'position'
  | 'currentHealth'
  | 'health'
  | 'appearance'
  | 'equipment'
> & {
  containerNode?: HTMLElement;
};

export const TileContainer = ({
  id,
  type,
  team,
  position,
  currentHealth,
  health,
  equipment,
  appearance,
  containerNode
}: CharacterProps) => {
  const dispatch = useDispatch();
  const hoveredElement = useSelector(hoveredElementSelector);
  const isBattlefieldDisabled = useSelector(battlefieldDisabledStatusSelector);
  const tileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerTileNode(id, tileRef.current!);
  }, []);

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

  const handleLoad = useCallback(
    (id: Trooper['id']) => {
      if (id) {
        dispatch(setTrooperLoadedStatus(id));
      }
    },
    [dispatch]
  );

  const handleClick = useCallback(() => {
    if (!isBattlefieldDisabled && currentHealth > 0) {
      dispatch(
        trooperClicked({
          id,
          team
        })
      );
    }
  }, [dispatch, id, team, isBattlefieldDisabled]);

  const activeTrooper = useSelector(activeTrooperSelector);
  const active = id === activeTrooper?.id;
  const hovered = id === hoveredElement?.id;

  const CharacterComponent = getCharacterByType(type);

  return (
    <Tile
      ref={tileRef}
      key={id}
      $team={team}
      $position={position}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {hovered && <HealthBar currentHealth={currentHealth} health={health} />}
      <EffectContainer id={id}>
        <Character
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          $team={team}
          $enemy={!active && team !== activeTrooper?.team}
          $active={active}
          $hovered={hovered}
        >
          <CharacterComponent
            containerNode={containerNode!}
            type={type}
            appearance={appearance}
            equipment={equipment}
            id={id}
            team={team}
            onLoad={handleLoad}
          />
        </Character>
      </EffectContainer>
    </Tile>
  );
};
