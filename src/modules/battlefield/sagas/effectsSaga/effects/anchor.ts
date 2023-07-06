import type { Effect, Trooper } from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { finishTrooperTurn } from 'modules/battlefield/sagas/roundSaga';
import anchorIcon from './icons/anchor.png';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { EFFECT } from '../../../constants';
import { addDamageEvent as addDamageEventAction } from 'modules/battlefield/reducers/damageEventsSlice';
import { getTileNode } from 'modules/battlefield/tilesNodesMap';
import { getEffectNode } from '../../../effectsNodesMap';

function* publishDamageEvent(id: Trooper['id']) {
  const tileNode = getTileNode(id);

  const { x, y } = tileNode!.getBoundingClientRect();
  const eventId = Date.now();
  const damageEvent = {
    id: eventId,
    value: 'Skipped',
    position: {
      x,
      y
    }
  };

  yield* put(addDamageEventAction(damageEvent));
}

export const createAnchorEffect = ({
  duration
}: {
  duration: number;
}): Effect => {
  return {
    name: 'might',
    duration,
    once: true,
    done: false,
    applyEffect: function* ({ activeTrooper }) {
      return function* () {
        yield* call(publishDamageEvent, activeTrooper.id);

        const anchorAnimation = yield* call(
          getAreaEffectAnimationInstance,
          EFFECT.ANCHOR
        );

        yield* call(anchorAnimation!.play);

        yield* call(finishTrooperTurn);
      };
    },
    cancelEffect: function* ({ activeTrooper }) {
      const effectNode = getEffectNode(activeTrooper.id);

      effectNode!.style.removeProperty('filter');
    },
    iconSrc: anchorIcon
  };
};
