import type { Effect, Trooper } from 'modules/battlefield/types';
import { put, select } from 'typed-redux-saga';
import { modifyTrooper } from 'modules/battlefield/actions';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';
import icon from './icons/divineShield.png';
import { EFFECT, EFFECT_TYPE } from 'common/constants';
import { generateId } from 'common/helpers';
import { getEffectNode } from 'modules/battlefield/effectsNodesMap';
import { detectCancelEffectUpdates } from './helpers/detectCancelEffectUpdates';

const setOrAdd = (currentValue: number | undefined, newValue: number) =>
  currentValue ? currentValue + newValue : newValue;

const getRevertTrooperUpdates = (trooper: Trooper) => ({
  defence: trooper.defence - 1000,
  resistance: {
    fire: trooper.resistance.fire - 1000,
    water: trooper.resistance.water - 1000,
    earth: trooper.resistance.earth - 1000,
    wind: trooper.resistance.wind - 1000,
    blood: trooper.resistance.blood - 1000,
    poison: trooper.resistance.poison - 1000,
    dark: trooper.resistance.dark - 1000,
    light: trooper.resistance.light - 1000
  }
});
const getTrooperUpdates = (trooper: Trooper) => ({
  defence: trooper.defence + 1000,
  resistance: {
    fire: setOrAdd(trooper.resistance?.fire, 1000),
    water: setOrAdd(trooper.resistance?.water, 1000),
    earth: setOrAdd(trooper.resistance?.earth, 1000),
    wind: setOrAdd(trooper.resistance?.wind, 1000),
    blood: setOrAdd(trooper.resistance?.blood, 1000),
    poison: setOrAdd(trooper.resistance?.poison, 1000),
    dark: setOrAdd(trooper.resistance?.dark, 1000),
    light: setOrAdd(trooper.resistance?.light, 1000)
  }
});

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
  iconSrc: icon,
  applyEffect: function* ({ targetTrooperId }) {
    const activeTrooper = yield* select(
      makeCharacterByIdSelector(targetTrooperId)
    );
    if (!activeTrooper) return;

    yield* put(
      modifyTrooper({
        id: activeTrooper.id,
        updates: getTrooperUpdates(activeTrooper),
        team: activeTrooper.team
      })
    );
  },
  cancelEffect: function* ({ targetTrooperId }) {
    const activeTrooper = yield* select(
      makeCharacterByIdSelector(targetTrooperId)
    );
    if (!activeTrooper) return;

    const effectNode = getEffectNode(activeTrooper.id);
    effectNode!.classList.remove('divine-shield');

    const updates = detectCancelEffectUpdates(this.id, {
      ...activeTrooper,
      ...getRevertTrooperUpdates(activeTrooper)
    });

    yield* put(
      modifyTrooper({
        id: activeTrooper.id,
        updates,
        team: activeTrooper.team
      })
    );
  },
  getTrooperUpdates,
  getRevertTrooperUpdates
});
