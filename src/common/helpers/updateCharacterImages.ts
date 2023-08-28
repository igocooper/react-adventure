import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { loadImage } from 'common/helpers';
import type { Trooper } from 'modules/battlefield/types';

type AppearanceUrls = Record<string, string>;

export const updateCharacterImages = async (
  id: Trooper['id'],
  newImages: Partial<AppearanceUrls>
) => {
  const characterAnimation = getTrooperAnimationInstance(id);
  if (!characterAnimation) return;

  for (const entry of Object.entries(newImages)) {
    const [itemSlot, url] = entry;

    if (!itemSlot) continue;

    if (!url) {
      delete characterAnimation.images[itemSlot];
      continue;
    }

    characterAnimation.images[itemSlot] = await loadImage(url);
  }
};
