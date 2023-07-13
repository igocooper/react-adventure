import { takeLatest, put } from 'typed-redux-saga/macro';
import {
  applyDamage,
  addDamageEvent as addDamageEventAction
} from '../actions';
import type { Trooper } from '../types';
import { getTileNode } from '../tilesNodesMap';
import { getRandomNumberInRange } from 'common/helpers';
import colors from 'theme/colors';

const getColor = ({
  isPoison,
  isCriticalDamage,
  hasMissed
}: {
  isPoison?: boolean;
  isCriticalDamage?: boolean;
  hasMissed?: boolean;
}) => {
  if (hasMissed) {
    return colors.white;
  }

  if (isCriticalDamage) {
    return colors.critical;
  }

  if (isPoison) {
    return colors.poison;
  }

  return colors.white;
};

const getValue = ({
  value,
  isCriticalDamage,
  hasMissed
}: {
  value: string | number;
  isCriticalDamage?: boolean;
  hasMissed?: boolean;
}) => {
  if (hasMissed) {
    return 'Miss';
  }

  if (isCriticalDamage) {
    return `Crit: -${value}`;
  }

  return `-${value}`;
};

function* addDamageEvent({
  payload
}: {
  payload: {
    id: Trooper['id'];
    damage: number | string;
    isCriticalDamage?: boolean;
    hasMissed?: boolean;
    isPoison?: boolean;
  };
}) {
  const { damage, id, isCriticalDamage, hasMissed, isPoison } = payload;
  const tileNode = getTileNode(id);

  if (!tileNode) return;

  const { x, y } = tileNode.getBoundingClientRect();
  const eventId = Date.now() + getRandomNumberInRange(1, 1000);
  const damageEvent = {
    id: eventId,
    value: getValue({
      value: damage,
      isCriticalDamage,
      hasMissed
    }),
    color: getColor({
      isPoison,
      isCriticalDamage
    }),
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
