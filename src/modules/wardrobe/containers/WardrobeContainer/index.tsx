import React from 'react';
import { getCharacterProps } from '../../../battlefield/helpers/getCharacterProps';
import { CharacterAnimation } from '../../../animation/containers/CharacterAnimation';
import { getTrooperAnimationInstance } from '../../../animation/troopersAnimationInstances';
import { loadImage } from '../../../animation/helpers/loadImage';
import { HEADS, ARMORS, WEAPONS, CHARACTER } from '../../constants';

type Props = Array<Record<string, string>>;

const updateCharacterImages = async (newImages: Props) => {
  const characterAnimation = getTrooperAnimationInstance(1000);
  if (!characterAnimation) return;

  for (const newImage of newImages) {
    const { url, itemSlot } = newImage;
    if (!url || !itemSlot) return;

    characterAnimation.images[itemSlot] = await loadImage(url);
  }
};

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
            const characterAnimation = getTrooperAnimationInstance(1000);
            characterAnimation?.attack();
          }}
        >
          Attack
        </button>
        <button
          onClick={() => {
            const characterAnimation = getTrooperAnimationInstance(1000);
            characterAnimation?.hurt();
          }}
        >
          Hurt
        </button>
        <button
          onClick={() => {
            const characterAnimation = getTrooperAnimationInstance(1000);
            characterAnimation?.die();
          }}
        >
          Die
        </button>
        <button
          onClick={() => {
            const characterAnimation = getTrooperAnimationInstance(1000);
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
          <CharacterAnimation {...getCharacterProps(CHARACTER.type)} id={CHARACTER.id} />
        </div>
        <div>
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
                onClick={async () => {
                  await updateCharacterImages(newCharacterImages);
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
                onClick={async () => {
                  await updateCharacterImages(newCharacterImages);
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
                onClick={async () => {
                  await updateCharacterImages(newCharacterImages);
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
