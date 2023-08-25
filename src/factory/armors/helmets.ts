import { HELMET_TYPE } from 'common/constants';
import type { Helmet } from 'common/types';

export const deathKnightHelmet: Helmet = {
  name: 'Death Knight Helmet',
  imageSrc: '/images/helmets/Death Knight Helmet.png',
  type: HELMET_TYPE.LARGE,
  stats: {
    defence: 10
  }
};

export const destroyerHelmet: Helmet = {
  name: 'Destroyer Helmet',
  imageSrc: '/images/helmets/Destroyer Helmet.png',
  type: HELMET_TYPE.FULL_FACE,
  large: true,
  stats: {
    defence: 10
  }
};

export const gladiatorFullHelmet: Helmet = {
  name: 'Gladiator Full Helmet',
  imageSrc: '/images/helmets/Gladiator Full Helmet.png',
  type: HELMET_TYPE.FULL_FACE,
  large: true,
  stats: {
    defence: 10
  }
};

export const fullHelmet: Helmet = {
  name: 'Full Helmet',
  imageSrc: '/images/helmets/Full Helmet.png',
  type: HELMET_TYPE.FULL_FACE,
  stats: {
    defence: 10
  }
};

export const paladinHelmet: Helmet = {
  name: 'Paladin Helmet',
  imageSrc: '/images/helmets/Paladin Helmet.png',
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
  imageSrc: '/images/helmets/Dark Paladin Helmet.png',
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
  imageSrc: '/images/helmets/Paladin Chief Helmet.png',
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
  imageSrc: '/images/helmets/Viking Helmet.png',
  type: HELMET_TYPE.MEDIUM,
  stats: {
    defence: 10
  }
};

export const torugCrown: Helmet = {
  name: 'Torug Crown',
  imageSrc: '/images/helmets/Torug Crown.png',
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
  gladiatorFullHelmet,
  deathKnightHelmet,
  destroyerHelmet
];
