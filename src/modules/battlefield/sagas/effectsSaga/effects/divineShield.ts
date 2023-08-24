import type { Effect } from 'modules/battlefield/types';
import { put, select } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/actions';
import { activeTrooperSelector } from 'modules/battlefield/selectors';
import icon from './icons/divineShield.png';
import { EFFECT, EFFECT_TYPE } from 'common/constants';
import { generateId } from 'common/helpers';
import { getEffectNode } from 'modules/battlefield/effectsNodesMap';

const setOrAdd = (currentValue: number | undefined, newValue: number) =>
  currentValue ? currentValue + newValue : newValue;

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
  applyEffect: function* () {
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!activeTrooper) return;

    yield* put(
      modifyTrooper({
        id: activeTrooper.id,
        updates: {
          defence: activeTrooper.defence + 1000,
          resistance: {
            fire: setOrAdd(activeTrooper.resistance?.fire, 1000),
            water: setOrAdd(activeTrooper.resistance?.water, 1000),
            earth: setOrAdd(activeTrooper.resistance?.earth, 1000),
            wind: setOrAdd(activeTrooper.resistance?.wind, 1000),
            blood: setOrAdd(activeTrooper.resistance?.blood, 1000),
            poison: setOrAdd(activeTrooper.resistance?.poison, 1000),
            dark: setOrAdd(activeTrooper.resistance?.dark, 1000),
            light: setOrAdd(activeTrooper.resistance?.light, 1000)
          }
        },
        team: activeTrooper.team
      })
    );
  },
  cancelEffect: function* () {
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!activeTrooper) return;

    const effectNode = getEffectNode(activeTrooper.id);
    effectNode!.classList.remove('divine-shield');

    yield* put(
      modifyTrooper({
        id: activeTrooper.id,
        updates: {
          defence: activeTrooper.defence - 1000,
          resistance: {
            fire: activeTrooper.resistance.fire - 1000,
            water: activeTrooper.resistance.water - 1000,
            earth: activeTrooper.resistance.earth - 1000,
            wind: activeTrooper.resistance.wind - 1000,
            blood: activeTrooper.resistance.blood - 1000,
            poison: activeTrooper.resistance.poison - 1000,
            dark: activeTrooper.resistance.dark - 1000,
            light: activeTrooper.resistance.light - 1000
          }
        },
        team: activeTrooper.team
      })
    );
  },
  iconSrc: icon
});
