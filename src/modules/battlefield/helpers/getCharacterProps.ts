const getUrls = (type: string) => {
  const urlList = {
    'Body.png': `/images/${type}/Body.png`,
    'Face 01.png': `/images/${type}/Face 01.png`,
    'Face 02.png': `/images/${type}/Face 02.png`,
    'Face 03.png': `/images/${type}/Face 03.png`,
    'Head.png': `/images/${type}/Head.png`,
    'Left Arm.png': `/images/${type}/Left Arm.png`,
    'Left Hand.png': `/images/${type}/Left Hand.png`,
    'Left Leg.png': `/images/${type}/Left Leg.png`,
    'Right Arm.png': `/images/${type}/Right Arm.png`,
    'Right Hand.png': `/images/${type}/Right Hand.png`,
    'Right Leg.png': `/images/${type}/Right Leg.png`,
    'SlashFX.png': `/images/${type}/SlashFX.png`,
    'Left Hand Weapon.png': `/images/${type}/Left Hand Weapon.png`,
    'Right Hand Weapon.png': `/images/${type}/Right Hand Weapon.png`
  };

  if (type === 'mountain-warrior-5') {
    return {
      ...urlList,
      'Bow.png': `/images/${type}/Bow.png`,
      'Bowstring.png': `/images/${type}/Bowstring.png`,
      'Drawn Bowstring.png': `/images/${type}/Drawn Bowstring.png`,
      'Arrow.png': `/images/${type}/Arrow.png`,
      'Quiver.png': `/images/${type}/Quiver.png`,
      'Axe.png': `/images/${type}/Axe.png`
    };
  }
  return urlList;
};

interface Props {
  imagesUrls: Record<string, string>;
  sconFileUrl: string;
}

const CHARACTER_PROPS: Record<string, Props> = {
  torug: {
    imagesUrls: getUrls('torug'),
    sconFileUrl: '/common.scon'
  },
  'mountain-warrior-1': {
    imagesUrls: getUrls('mountain-warrior-1'),
    sconFileUrl: '/common.scon'
  },
  'mountain-warrior-2': {
    imagesUrls: getUrls('mountain-warrior-2'),
    sconFileUrl: '/common.scon'
  },
  'mountain-warrior-3': {
    imagesUrls: getUrls('mountain-warrior-3'),
    sconFileUrl: '/common.scon'
  },
  'mountain-warrior-4': {
    imagesUrls: getUrls('mountain-warrior-4'),
    sconFileUrl: '/common.scon'
  },
  'mountain-warrior-5': {
    imagesUrls: getUrls('mountain-warrior-5'),
    sconFileUrl: '/archer.scon'
  },
  'goblin-1': {
    imagesUrls: getUrls('goblin-1'),
    sconFileUrl: '/common.scon'
  },
  'goblin-2': {
    imagesUrls: getUrls('goblin-2'),
    sconFileUrl: '/common.scon'
  },
  'goblin-3': {
    imagesUrls: getUrls('goblin-3'),
    sconFileUrl: '/common.scon'
  },
  'golem-1': {
    imagesUrls: getUrls('golem-1'),
    sconFileUrl: '/common.scon'
  },
  'golem-2': {
    imagesUrls: getUrls('golem-2'),
    sconFileUrl: '/common.scon'
  },
  'golem-3': {
    imagesUrls: getUrls('golem-3'),
    sconFileUrl: '/common.scon'
  },
  'fallen-angel-1': {
    imagesUrls: getUrls('fallen-angel-1'),
    sconFileUrl: '/common.scon'
  },
  'fallen-angel-2': {
    imagesUrls: getUrls('fallen-angel-2'),
    sconFileUrl: '/common.scon'
  },
  'fallen-angel-3': {
    imagesUrls: getUrls('fallen-angel-3'),
    sconFileUrl: '/common.scon'
  },
  'minotaur-1': {
    imagesUrls: getUrls('minotaur-1'),
    sconFileUrl: '/common.scon'
  },
  'minotaur-2': {
    imagesUrls: getUrls('minotaur-2'),
    sconFileUrl: '/common.scon'
  },
  'minotaur-3': {
    imagesUrls: getUrls('minotaur-3'),
    sconFileUrl: '/common.scon'
  },
  'reaper-1': {
    imagesUrls: getUrls('reaper-1'),
    sconFileUrl: '/common.scon'
  },
  'reaper-2': {
    imagesUrls: getUrls('reaper-2'),
    sconFileUrl: '/common.scon'
  },
  'reaper-3': {
    imagesUrls: getUrls('reaper-3'),
    sconFileUrl: '/common.scon'
  }
};

export const getCharacterProps = (type: string) => {
  return CHARACTER_PROPS[type]!;
};
