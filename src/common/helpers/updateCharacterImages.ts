import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { loadImage } from 'common/helpers';

type Props = Array<Record<string, string>>;

export const updateCharacterImages = async (newImages: Props, id: number) => {
  const characterAnimation = getTrooperAnimationInstance(id);
  if (!characterAnimation) return;

  for (const newImage of newImages) {
    const { url, itemSlot } = newImage;
    if (!url || !itemSlot) return;

    characterAnimation.images[itemSlot] = await loadImage(url);
  }
};
