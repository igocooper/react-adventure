const getUrls = (type: string) => {
  return {
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
    'Sword.png': `/images/${type}/Sword.png`
  };
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
    sconFileUrl: '/common.scon'
  }
};

export const getCharacterProps = (type: string) => {
  return CHARACTER_PROPS[type]!;
};
