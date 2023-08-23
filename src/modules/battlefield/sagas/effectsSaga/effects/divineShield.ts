import type { ApplyEffectProps, Effect } from 'modules/battlefield/types';
import { put } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/actions';
import icon from './icons/divineShield.png';
import { EFFECT, EFFECT_TYPE } from 'common/constants';
import { generateId } from 'common/helpers';

export const createDivineShieldEffect = ({
  duration
}: {
  duration: number;
}): Effect => ({
  id: generateId(),
  name: EFFECT.DIVINE_SHIELD,
  type: EFFECT_TYPE.BUFF,
  description: `"${EFFECT.DIVINE_SHIELD}" absorbs all damage.`,
  duration,
  once: true,
  done: false,
  applyEffect: function* ({ activeTrooper }: ApplyEffectProps) {
    yield* put(
      modifyTrooper({
        id: activeTrooper.id,
        updates: {
          defence: activeTrooper.defence + 100,
          resistance: {
            fire: activeTrooper.resistance?.fire
              ? activeTrooper.resistance.fire + 100
              : 100,
            water: 100,
            earth: 100,
            wind: 100,
            blood: 100,
            poison: 100,
            dark: 100,
            light: 100
          }
        },
        team: activeTrooper.team
      })
    );
  },
  cancelEffect: function* ({ activeTrooper }: ApplyEffectProps) {
    yield* put(
      modifyTrooper({
        id: activeTrooper.id,
        updates: {
          // TODO: revert cahnges
        },
        team: activeTrooper.team
      })
    );
  },
  iconSrc: icon
});
