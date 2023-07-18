import type {
  Ability,
  ApplyAbilityProps,
  Trooper
} from 'modules/battlefield/types';
import { call, put } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { getEffectNode } from 'modules/battlefield/effectsNodesMap';
import { getTileNode } from 'modules/battlefield/tilesNodesMap';
import { addDamageEvent as addDamageEventAction } from 'modules/battlefield/reducers/damageEventsSlice';
import { createAnchorEffect } from '../../effectsSaga/effects';
import { ABILITY_TYPE, ABILITY } from 'common/constants';
import theme from 'theme/defaultTheme';
import icon from './icons/anchor.png';

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
    },
    color: theme.color.black
  };

  yield* put(addDamageEventAction(damageEvent));
}

export const createAnchorAbility = ({
  duration
}: {
  duration: number;
}): Ability => ({
  iconSrc: icon,
  type: ABILITY_TYPE.CURSE,
  name: ABILITY.ANCHOR,
  applyAbility: function* ({ targetTrooper }: ApplyAbilityProps) {
    const anchorEffect = createAnchorEffect({
      duration
    });

    const effectNode = getEffectNode(targetTrooper.id);

    effectNode!.classList.add(ABILITY.ANCHOR);

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
