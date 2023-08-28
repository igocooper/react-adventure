import { call, select } from 'typed-redux-saga';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import type { Trooper } from 'modules/battlefield/types';
import { makeCharacterByIdSelector } from '../selectors';
import { updateCharacterImages } from 'common/helpers';
import { CHARACTER_IMAGE_SLOT } from 'common/constants';

export function* playEffectedAnimation(
  id: Trooper['id'],
  effectImageUrl: string
) {
  const targetTrooper = yield* select(makeCharacterByIdSelector(id));

  if (!targetTrooper) return;

  const trooperAnimationInstance = yield* call(
    getTrooperAnimationInstance,
    targetTrooper.id
  );

  yield* call(updateCharacterImages, id, {
    [CHARACTER_IMAGE_SLOT.EFFECT]: effectImageUrl
  });

  yield* call([trooperAnimationInstance!, 'effected']);
}
