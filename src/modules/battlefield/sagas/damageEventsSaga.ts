import { takeLatest, put } from 'typed-redux-saga/macro';
import {
  applyDamage,
  addDamageEvent as addDamageEventAction
} from '../actions';
import type { Trooper } from '../types';
import { getTileNode } from '../tilesNodesMap';
import { getRandomNumberInRange } from 'common/helpers';

function* addDamageEvent({
  payload
}: {
  payload: {
    id: Trooper['id'];
    damage: number | string;
    isCriticalDamage?: boolean;
    isEvading?: boolean;
    isPoison?: boolean;
  };
}) {
  const { damage, id, isCriticalDamage, isEvading, isPoison } = payload;
  const tileNode = getTileNode(id);

  if (!tileNode) return;

  const { x, y } = tileNode.getBoundingClientRect();
  const eventId = Date.now() + getRandomNumberInRange(1, 1000);
  const damageEvent = {
    id: eventId,
    value: `-${damage}`,
    isCriticalDamage,
    isPoison,
    isEvading,
    position: {
      x,
      y
    }
  };

  yield* put(addDamageEventAction(damageEvent));
}

export function* damageEventsSagaWatcher() {
  yield takeLatest(applyDamage, addDamageEvent);
}
