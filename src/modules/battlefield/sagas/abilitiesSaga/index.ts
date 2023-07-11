import { call, select } from 'typed-redux-saga/macro';
import {
  activeTrooperSelector,
  makeCharacterByIdSelector
} from '../../selectors';
import type { Trooper } from '../../types';
import { ABILITY_TYPE } from 'common/constants';

export function* applyBuffs({ id }: { id: Trooper['id'] }) {
  const targetTrooper = yield* select(makeCharacterByIdSelector(id));
  const activeTrooper = yield* select(activeTrooperSelector);
  if (!targetTrooper || !activeTrooper) return;

  const { abilities } = activeTrooper;

  const buffs = abilities.filter(
    (ability) => ability.type === ABILITY_TYPE.BUFF
  );

  for (const buff of buffs) {
    yield* call([buff, 'applyAbility'], { targetTrooper });
  }
}

export function* applyCurses({ id }: { id: Trooper['id'] }) {
  const targetTrooper = yield* select(makeCharacterByIdSelector(id));
  const activeTrooper = yield* select(activeTrooperSelector);
  if (!targetTrooper || !activeTrooper) return;

  const { abilities } = activeTrooper;

  const curses = abilities.filter(
    (ability) => ability.type === ABILITY_TYPE.CURSE
  );

  for (const curse of curses) {
    yield* call([curse, 'applyAbility'], { targetTrooper });
  }
}
