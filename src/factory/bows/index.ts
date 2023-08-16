import type { Bow } from 'common/types';

export const mountainBow: Bow = {
  name: 'Mountain Bow',
  imageUrls: {
    bowStem: '/images/mountain-archer/Bow.png',
    arrow: '/images/mountain-archer/Arrow.png',
    quiver: '/images/mountain-archer/Quiver.png',
    bowString: '/images/mountain-archer/Bowstring.png',
    drawnBowString: '/images/mountain-archer/Drawn Bowstring.png'
  },
  stats: {
    damage: '10-15'
  }
};
