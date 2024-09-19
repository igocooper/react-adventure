import { HELMET_TYPE } from 'common/constants';
import type { Helmet } from 'common/types';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';

export const deathKnightHelmet: Helmet = {
  name: 'Death Knight Helmet',
  imageSrc: resolveAssetUrl('/images/helmets/480/Death Knight Helmet.png'),
  type: HELMET_TYPE.LARGE,
  stats: {
    defence: 10
  }
};
export const clericHat: Helmet = {
  name: 'Cleric Hat',
  imageSrc: resolveAssetUrl('/images/helmets/600/Cleric Hat.png'),
  type: HELMET_TYPE.MEDIUM,
  large: true,
  stats: {
    defence: 10
  }
};
export const armoredGoblinHelmet: Helmet = {
  name: 'Armored Goblin Helmet',
  imageSrc: resolveAssetUrl('/images/helmets/480/Armored Goblin Helmet.png'),
  type: HELMET_TYPE.LARGE,
  stats: {
    defence: 10
  }
};

export const landsknechtHelmet: Helmet = {
  name: 'Landsknecht Helmet',
  imageSrc: resolveAssetUrl('/images/helmets/600/Landsknecht Helmet.png'),
  type: HELMET_TYPE.LARGE,
  large: true,
  stats: {
    defence: 10
  }
};

export const destroyerHelmet: Helmet = {
  name: 'Destroyer Helmet',
  imageSrc: resolveAssetUrl('/images/helmets/600/Destroyer Helmet.png'),
  type: HELMET_TYPE.FULL_FACE,
  large: true,
  stats: {
    defence: 10
  }
};

export const spartanianFullHelmet: Helmet = {
  name: 'Spartanian Full Helmet',
  imageSrc: resolveAssetUrl('/images/helmets/600/Spartanian Full Helmet.png'),
  type: HELMET_TYPE.FULL_FACE,
  large: true,
  stats: {
    defence: 10
  }
};

export const fullHelmet: Helmet = {
  name: 'Full Helmet',
  imageSrc: resolveAssetUrl('/images/helmets/480/Knight Full Helmet.png'),
  type: HELMET_TYPE.FULL_FACE,
  stats: {
    defence: 10
  }
};

export const paladinHelmet: Helmet = {
  name: 'Paladin Helmet',
  imageSrc: resolveAssetUrl('/images/helmets/480/Paladin Helmet.png'),
  type: HELMET_TYPE.FULL_FACE,
  stats: {
    defence: 15,
    resistance: {
      dark: 30,
      fire: 10
    }
  }
};

export const darkPaladinHelmet: Helmet = {
  name: 'Paladin Helmet',
  imageSrc: resolveAssetUrl('/images/helmets/480/Dark Paladin Helmet.png'),
  type: HELMET_TYPE.FULL_FACE,
  stats: {
    defence: 15,
    resistance: {
      dark: 30,
      fire: 10
    }
  }
};

export const paladinChiefHelmet: Helmet = {
  name: 'Paladin Chief Helmet',
  imageSrc: resolveAssetUrl('/images/helmets/480/Paladin Chief Helmet.png'),
  type: HELMET_TYPE.FULL_FACE,
  stats: {
    defence: 20,
    resistance: {
      dark: 50,
      fire: 20
    }
  }
};

export const vikingHelmet: Helmet = {
  name: 'Viking Helmet',
  imageSrc: resolveAssetUrl(
    '/images/helmets/480/Viking Small Picked Helmet.png'
  ),
  type: HELMET_TYPE.MEDIUM,
  stats: {
    defence: 10
  }
};

export const torugCrown: Helmet = {
  name: 'Torug Crown',
  imageSrc: resolveAssetUrl('/images/helmets/480/Torug Crown.png'),
  type: HELMET_TYPE.SMALL,
  stats: {
    defence: 10
  }
};

export const helmets = [
  torugCrown,
  vikingHelmet,
  darkPaladinHelmet,
  paladinHelmet,
  fullHelmet,
  spartanianFullHelmet,
  deathKnightHelmet,
  destroyerHelmet,
  landsknechtHelmet,
  clericHat,
  armoredGoblinHelmet
];
