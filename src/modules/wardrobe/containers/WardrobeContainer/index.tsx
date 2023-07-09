import React from 'react';
import { getCharacterProps } from '../../../battlefield/helpers/getCharacterProps';
import { CharacterAnimation } from '../../../animation/containers/CharacterAnimation';
import { getTrooperAnimationInstance } from '../../../animation/troopersAnimationInstances';
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
import { TROOPER_TEAM } from '../../../battlefield/constants';

export const WardrobeContainer = () => {
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
              appearance: CHARACTER.appearance
            })}
            id={CHARACTER.id}
            team={TROOPER_TEAM.ATTACKERS}
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
