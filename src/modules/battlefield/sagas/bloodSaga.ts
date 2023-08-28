import { takeLatest, select } from 'typed-redux-saga/macro';
import { applyDamage } from '../actions';
import { makeCharacterByIdSelector } from '../selectors';
import { getRandomArrayElement, updateCharacterImages } from 'common/helpers';
import {
  BODY_BLOOD_URLS,
  BODY_CUT_URLS,
  FACE_BLOOD_URLS,
  FACE_CUT_URLS,
  CHARACTER_IMAGE_SLOT
} from 'common/constants';
import { getTrooperAnimationInstance } from '../../animation/troopersAnimationInstances';

import type { Trooper, bloodItemSlot } from '../types';

const getHealthPercent = (health: number, percent: number) =>
  Math.round((health / 100) * percent);

const updateBloodSlot = ({
  urls,
  itemSlot,
  id
}: {
  urls: string[];
  itemSlot: bloodItemSlot;
  id: number;
}) => {
  const characterAnimation = getTrooperAnimationInstance(id);
  if (!characterAnimation) return;

  const url = getRandomArrayElement(urls);

  const newImages = {
    [itemSlot]: url!
  };

  void updateCharacterImages(id, newImages);
  characterAnimation.bloodSlots[itemSlot] = true;
};

function* addBlood({
  payload
}: {
  payload: {
    id: Trooper['id'];
  };
}) {
  const { id: attackedTrooperId } = payload;
  const attackedTrooper = yield* select(
    makeCharacterByIdSelector(attackedTrooperId)
  );
  const characterAnimation = getTrooperAnimationInstance(attackedTrooperId);

  if (!attackedTrooper) return;
  if (!characterAnimation) return;

  const { currentHealth, health } = attackedTrooper;

  const { bloodSlots } = characterAnimation;

  if (
    !bloodSlots[CHARACTER_IMAGE_SLOT.BODY_BLOOD] &&
    currentHealth < getHealthPercent(health, 75)
  ) {
    updateBloodSlot({
      urls: BODY_BLOOD_URLS,
      itemSlot: CHARACTER_IMAGE_SLOT.BODY_BLOOD,
      id: attackedTrooperId
    });
  }

  if (
    !bloodSlots[CHARACTER_IMAGE_SLOT.FACE_BLOOD] &&
    currentHealth < getHealthPercent(health, 50)
  ) {
    updateBloodSlot({
      urls: FACE_BLOOD_URLS,
      itemSlot: CHARACTER_IMAGE_SLOT.FACE_BLOOD,
      id: attackedTrooperId
    });
  }

  if (
    !bloodSlots[CHARACTER_IMAGE_SLOT.FACE_CUT] &&
    currentHealth < getHealthPercent(health, 25)
  ) {
    updateBloodSlot({
      urls: FACE_CUT_URLS,
      itemSlot: CHARACTER_IMAGE_SLOT.FACE_CUT,
      id: attackedTrooperId
    });
  }

  if (
    !bloodSlots[CHARACTER_IMAGE_SLOT.BODY_CUT] &&
    currentHealth < getHealthPercent(health, 15)
  ) {
    updateBloodSlot({
      urls: BODY_CUT_URLS,
      itemSlot: CHARACTER_IMAGE_SLOT.BODY_CUT,
      id: attackedTrooperId
    });
  }
}

export function* bloodSagaWatcher() {
  yield takeLatest(applyDamage, addBlood);
}
