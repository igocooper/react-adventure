import type { Bow } from 'common/types';
import { WEAPON_TYPE } from 'common/constants';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';

export const mountainBow: Bow = {
  name: 'Mountain Bow',
  type: WEAPON_TYPE.BOW,
  imageUrls: {
    bowStem: resolveAssetUrl('/images/bows/mountain-archer-bow/Bow.png'),
    arrow: resolveAssetUrl('/images/bows/mountain-archer-bow/Arrow.png'),
    quiver: resolveAssetUrl('/images/bows/mountain-archer-bow/Quiver.png'),
    bowString: resolveAssetUrl(
      '/images/bows/mountain-archer-bow/Bowstring.png'
    ),
    drawnBowString: resolveAssetUrl(
      '/images/bows/mountain-archer-bow/Drawn Bowstring.png'
    )
  },
  stats: {
    damage: '10-15'
  }
};

export const bows = [mountainBow];
