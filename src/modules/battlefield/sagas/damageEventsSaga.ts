import { takeLatest, put } from 'typed-redux-saga/macro';
import {
  applyDamage,
  addDamageEvent as addDamageEventAction
} from '../actions';
import { type Trooper } from '../types';
import { getTileNode } from '../tilesNodesMap';

function* addDamageEvent({
  payload
}: {
  payload: {
    id: Trooper['id'];
    damage: number;
    isCriticalDamage?: boolean;
    isEvading?: boolean;
    isPoison?: boolean;
  };
}) {
  const { damage, id, isCriticalDamage, isEvading, isPoison } = payload;
  const tileNode = getTileNode(id);

  if (!tileNode) return;

  const { x, y } = tileNode.getBoundingClientRect();
  const eventId = Date.now();
  const damageEvent = {
    id: eventId,
    damage,
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
