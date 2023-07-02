import { takeLatest, select } from 'typed-redux-saga/macro';
import { applyDamage } from '../actions';
import { makeCharacterByIdSelector } from '../selectors';
import {getRandomArrayElement, updateCharacterImages} from 'common/helpers';
import {
  bodyBloodUrls,
  bodyCutUrls,
  faceBloodUrls,
  faceCutUrls,
  itemSlots
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

  const newImages = [{ url: url!, itemSlot }];

  updateCharacterImages(newImages, id);
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
    !bloodSlots[itemSlots.BODY_BLOOD] &&
    currentHealth < getHealthPercent(health, 75)
  ) {
    updateBloodSlot({
      urls: bodyBloodUrls,
      itemSlot: itemSlots.BODY_BLOOD,
      id: attackedTrooperId
    });
  }

  if (
    !bloodSlots[itemSlots.FACE_BLOOD] &&
    currentHealth < getHealthPercent(health, 50)
  ) {
    updateBloodSlot({
      urls: faceBloodUrls,
      itemSlot: itemSlots.FACE_BLOOD,
      id: attackedTrooperId
    });
  }

  if (
    !bloodSlots[itemSlots.FACE_CUT] &&
    currentHealth < getHealthPercent(health, 25)
  ) {
    updateBloodSlot({
      urls: faceCutUrls,
      itemSlot: itemSlots.FACE_CUT,
      id: attackedTrooperId
    });
  }

  if (
    !bloodSlots[itemSlots.BODY_CUT] &&
    currentHealth < getHealthPercent(health, 15)
  ) {
    updateBloodSlot({
      urls: bodyCutUrls,
      itemSlot: itemSlots.BODY_CUT,
      id: attackedTrooperId
    });
  }
}

export function* bloodSagaWatcher() {
  yield takeLatest(applyDamage, addBlood);
}
