import React, { useCallback } from 'react';
import { getCharacterProps } from 'modules/battlefield/helpers/getCharacterProps';
import { CharacterAnimation } from 'modules/animation/containers/CharacterAnimation';
import type { OnLoadArgs } from 'modules/animation/containers/CharacterAnimation';
import {
  getTrooperAnimationInstance,
  register
} from 'modules/animation/troopersAnimationInstances';
import { updateCharacterImages } from 'common/helpers';
import {
  HEADS,
  ARMORS,
  WEAPONS,
  CHARACTER,
  HELMETS,
  BEARDS,
  HAIRS
} from '../../constants';
import { TROOPER_TEAM } from 'modules/battlefield/constants';
import { DAMAGE_TYPE } from 'common/constants';
import { setTrooperLoadedStatus } from 'modules/battlefield/reducers/battlefieldLoadedStatusSlice';
import { registerTrooperNode } from 'modules/battlefield/troopersNodesMap';
import { useDispatch } from 'store/hooks';

export const WardrobeContainer = () => {
  const dispatch = useDispatch();
  const handleLoad = useCallback(
    ({ id, canvasNode, instance }: OnLoadArgs) => {
      dispatch(setTrooperLoadedStatus(id));
      register(id, instance);
      registerTrooperNode(id, canvasNode);
    },
    [dispatch]
  );

  return (
    <div>
      <div
        style={{
          padding: '10px'
        }}
      >
        <button
          onClick={() => {
            const characterAnimation = getTrooperAnimationInstance(
              CHARACTER.id
            );
            characterAnimation?.attack();
          }}
        >
          Attack
        </button>
        <button
          onClick={() => {
            const characterAnimation = getTrooperAnimationInstance(
              CHARACTER.id
            );
            characterAnimation?.hurt();
          }}
        >
          Hurt
        </button>
        <button
          onClick={() => {
            const characterAnimation = getTrooperAnimationInstance(
              CHARACTER.id
            );
            characterAnimation?.die();
          }}
        >
          Die
        </button>
        <button
          onClick={() => {
            const characterAnimation = getTrooperAnimationInstance(
              CHARACTER.id
            );
            characterAnimation?.die();
          }}
        >
          Shoot
        </button>
      </div>
      <div
        style={{
          display: 'flex'
        }}
      >
        <div>
          <CharacterAnimation
            {...getCharacterProps({
              type: CHARACTER.type,
              equipment: CHARACTER.equipment,
              appearance: CHARACTER.appearance,
              damageType: DAMAGE_TYPE.PHYSICAL
            })}
            id={CHARACTER.id}
            team={TROOPER_TEAM.ATTACKERS}
            onLoad={handleLoad}
          />
        </div>
        <div>
          <div>
            <h2>Hairs</h2>
            {HAIRS.map(({ iconUrl, newCharacterImages }) => (
              <img
                key={iconUrl}
                style={{
                  height: '50px',
                  padding: '10px',
                  border: 'dotted'
                }}
                onClick={() => {
                  updateCharacterImages(newCharacterImages, CHARACTER.id);
                }}
                src={iconUrl}
              />
            ))}
          </div>
          <div>
            <h2>Beards</h2>
            {BEARDS.map(({ iconUrl, newCharacterImages }) => (
              <img
                key={iconUrl}
                style={{
                  height: '50px',
                  padding: '10px',
                  border: 'dotted'
                }}
                onClick={() => {
                  updateCharacterImages(newCharacterImages, CHARACTER.id);
                }}
                src={iconUrl}
              />
            ))}
          </div>
          <div>
            <h2>Helmets</h2>
            {HELMETS.map(({ iconUrl, newCharacterImages }) => (
              <img
                key={iconUrl}
                style={{
                  height: '50px',
                  padding: '10px',
                  border: 'dotted'
                }}
                onClick={() => {
                  updateCharacterImages(newCharacterImages, CHARACTER.id);
                }}
                src={iconUrl}
              />
            ))}
          </div>
          <div>
            <h2>Heads</h2>
            {HEADS.map(({ iconUrl, newCharacterImages }) => (
              <img
                key={iconUrl}
                style={{
                  height: '50px',
                  padding: '10px',
                  border: 'dotted'
                }}
                onClick={() => {
                  updateCharacterImages(newCharacterImages, CHARACTER.id);
                }}
                src={iconUrl}
              />
            ))}
          </div>
          <div>
            <h2>Bodies</h2>
            {ARMORS.map(({ iconUrl, newCharacterImages }) => (
              <img
                key={iconUrl}
                style={{
                  height: '50px',
                  padding: '10px',
                  border: 'dotted'
                }}
                onClick={() => {
                  updateCharacterImages(newCharacterImages, CHARACTER.id);
                }}
                src={iconUrl}
              />
            ))}
          </div>
          <div>
            <h2>Weapons</h2>
            {WEAPONS.map(({ iconUrl, newCharacterImages }) => (
              <img
                key={iconUrl}
                style={{
                  height: '50px',
                  padding: '10px',
                  border: 'dotted'
                }}
                onClick={() => {
                  updateCharacterImages(newCharacterImages, CHARACTER.id);
                }}
                src={iconUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
