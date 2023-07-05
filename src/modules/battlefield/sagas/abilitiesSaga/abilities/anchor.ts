import type {
  Ability,
  ApplyAbilityProps,
  type Trooper
} from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { getEffectNode } from 'modules/battlefield/effectsNodesMap';
import { getTileNode } from 'modules/battlefield/tilesNodesMap';
import { addDamageEvent as addDamageEventAction } from 'modules/battlefield/reducers/damageEventsSlice';
import { createAnchorEffect } from '../../effectsSaga/effects';

function* publishDamageEvent(id: Trooper['id']) {
  const tileNode = getTileNode(id);

  const { x, y } = tileNode!.getBoundingClientRect();
  const eventId = Date.now();
  const damageEvent = {
    id: eventId,
    value: 'Anchored',
    position: {
      x,
      y
    }
  };

  yield* put(addDamageEventAction(damageEvent));
}

export const createAnchorAbility = ({
  duration
}: {
  duration: number;
}): Ability => ({
  name: 'anchor',
  applyAbility: function* ({ targetTrooper }: ApplyAbilityProps) {
    const anchorEffect = createAnchorEffect({
      duration
    });

    const effectNode = getEffectNode(targetTrooper.id);

    effectNode!.style.transition = 'filter 500ms linear';
    effectNode!.style.filter = 'grayscale(1)';

    yield* call(publishDamageEvent, targetTrooper.id);

    yield* put(
      addEffect({
        id: targetTrooper.id,
        team: targetTrooper.team,
        effect: anchorEffect
      })
    );
  }
});
