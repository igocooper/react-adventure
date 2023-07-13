import { HELMET_TYPE } from '../common/constants';
import type { Helmet } from '../common/types';

export const deathKnightHelmet: Helmet = {
  name: 'Death Knight Helmet',
  imageSrc: '/images/helmets/Death Knight Helmet.png',
  type: HELMET_TYPE.LARGE,
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
