import { CommonCharacter } from '../characters/CommonCharacter';
import { MountainArcher } from '../characters/MoutainArcher';
import { WaterMage } from '../characters/WaterMage';
import { MountainMage } from '../characters/MountainMage';

export const getCharacterByType = (type: string) => {
  switch (type) {
    case 'mountain-archer':
      return MountainArcher;
    case 'water-mage':
      return WaterMage;
    case 'mountain-mage':
      return MountainMage;

    default: {
      return CommonCharacter;
    }
  }
};
