import type { Armor } from 'common/types';

export const torugArmor: Armor = {
  name: 'Torug Armor',
  imageUrls: {
    body: '/images/torug/Body.png',
    rightHand: '/images/torug/Right Hand.png',
    rightArm: '/images/torug/Right Arm.png',
    rightLeg: '/images/torug/Right Leg.png',
    leftArm: '/images/torug/Left Arm.png',
    leftHand: '/images/torug/Left Hand.png',
    leftLeg: '/images/torug/Left Leg.png'
  },
  stats: {
    defence: 10
  }
};

export const destroyerArmor: Armor = {
  name: 'Destroyer Armor',
  imageUrls: {
    body: '/images/armors/destroyer/Body.png',
    rightHand: '/images/armors/destroyer/Right Hand.png',
    rightArm: '/images/armors/destroyer/Right Arm.png',
    rightLeg: '/images/armors/destroyer/Right Leg.png',
    leftArm: '/images/armors/destroyer/Left Arm.png',
    leftHand: '/images/armors/destroyer/Left Hand.png',
    leftLeg: '/images/armors/destroyer/Left Leg.png'
  },
  stats: {
    defence: 20
  }
};

export const paladinArmor: Armor = {
  name: 'Destroyer Armor',
  imageUrls: {
    body: '/images/armors/paladin/Body.png',
    rightHand: '/images/armors/paladin/Right Hand.png',
    rightArm: '/images/armors/paladin/Right Arm.png',
    rightLeg: '/images/armors/paladin/Right Leg.png',
    leftArm: '/images/armors/paladin/Left Arm.png',
    leftHand: '/images/armors/paladin/Left Hand.png',
    leftLeg: '/images/armors/paladin/Left Leg.png'
  },
  stats: {
    defence: 20
  }
};

export const darkPaladinArmor: Armor = {
  name: 'Destroyer Armor',
  imageUrls: {
    body: '/images/armors/dark-paladin/Body.png',
    rightHand: '/images/armors/dark-paladin/Right Hand.png',
    rightArm: '/images/armors/dark-paladin/Right Arm.png',
    rightLeg: '/images/armors/dark-paladin/Right Leg.png',
    leftArm: '/images/armors/dark-paladin/Left Arm.png',
    leftHand: '/images/armors/dark-paladin/Left Hand.png',
    leftLeg: '/images/armors/dark-paladin/Left Leg.png'
  },
  stats: {
    defence: 20
  }
};

export const paladinChiefArmor: Armor = {
  name: 'Destroyer Armor',
  imageUrls: {
    body: '/images/armors/paladin-chief/Body.png',
    rightHand: '/images/armors/paladin-chief/Right Hand.png',
    rightArm: '/images/armors/paladin-chief/Right Arm.png',
    rightLeg: '/images/armors/paladin-chief/Right Leg.png',
    leftArm: '/images/armors/paladin-chief/Left Arm.png',
    leftHand: '/images/armors/paladin-chief/Left Hand.png',
    leftLeg: '/images/armors/paladin-chief/Left Leg.png'
  },
  stats: {
    defence: 20
  }
};

export const darkKnightArmor: Armor = {
  name: 'Dark Knight Armor',
  imageUrls: {
    body: '/images/armor/Body.png',
    rightHand: '/images/armors/dark-knight/Right Hand.png',
    rightArm: '/images/armors/dark-knight/Right Arm.png',
    rightLeg: '/images/armors/dark-knight/Right Leg.png',
    leftArm: '/images/armors/dark-knight/Left Arm.png',
    leftHand: '/images/armors/dark-knight/Left Hand.png',
    leftLeg: '/images/armors/dark-knight/Left Leg.png'
  },
  stats: {
    defence: 10
  }
};

export const armors = [
  darkPaladinArmor,
  paladinArmor,
  paladinChiefArmor,
  darkKnightArmor,
  destroyerArmor,
  torugArmor
];
