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
    'Left Hand Weapon.png': `/images/${type}/Left Hand Weapon.png`,
    'Right Hand Weapon.png': `/images/${type}/Right Hand Weapon.png`,
    // Archer images
    'Bow.png': `/images/${type}/Bow.png`,
    'Bowstring.png': `/images/${type}/Bowstring.png`,
    'Drawn Bowstring.png': `/images/${type}/Drawn Bowstring.png`,
    'Arrow.png': `/images/${type}/Arrow.png`,
    'Quiver.png': `/images/${type}/Quiver.png`,
    'Axe.png': `/images/${type}/Axe.png`
  };
};

const getSconFile = (type: string) => {
  switch (type) {
    case 'mountain-warrior-5': {
      return '/archer.scon';
    }
    default:
      return '/common.scon';
  }
};

interface Props {
  imagesUrls: Record<string, string>;
  sconFileUrl: string;
}

export const getCharacterProps = (type: string): Props => {
  return {
    imagesUrls: getUrls(type),
    sconFileUrl: getSconFile(type)
  };
};
