import type { Bow } from 'common/types';
import { WEAPON_TYPE } from 'common/constants';

export const mountainBow: Bow = {
  name: 'Mountain Bow',
  type: WEAPON_TYPE.BOW,
  imageUrls: {
    bowStem: '/images/bows/mountain-archer-bow/Bow.png',
    arrow: '/images/bows/mountain-archer-bow/Arrow.png',
    quiver: '/images/bows/mountain-archer-bow/Quiver.png',
    bowString: '/images/bows/mountain-archer-bow/Bowstring.png',
    drawnBowString: '/images/bows/mountain-archer-bow/Drawn Bowstring.png'
  },
  stats: {
    damage: '10-15'
  }
};

export const bows = [mountainBow];
