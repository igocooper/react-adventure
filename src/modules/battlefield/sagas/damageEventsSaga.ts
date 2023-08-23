import { takeLatest, put, call } from 'typed-redux-saga/macro';
import {
  applyDamage,
  addDamageEvent as addDamageEventAction
} from '../actions';
import { getTileNode } from '../tilesNodesMap';
import { generateId, wait } from 'common/helpers';
import colors from 'theme/colors';
import { DAMAGE_TYPE } from 'common/constants';

import type { Trooper } from '../types';
import type { DamageType } from 'common/types';

const getColor = ({
  damageType,
  isCriticalDamage,
  hasMissed
}: {
  damageType: DamageType;
  isCriticalDamage?: boolean;
  hasMissed?: boolean;
}) => {
  if (hasMissed) {
    return colors.white;
  }

  if (isCriticalDamage) {
    return colors.critical;
  }

  if (damageType === DAMAGE_TYPE.POISON) {
    return colors.poison;
  }

  if (damageType === DAMAGE_TYPE.BLOOD) {
    return colors.blood;
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

export function* publishDamageEvent({
  id,
  value,
  delay,
  color
}: {
  id: Trooper['id'];
  value: string | number;
  delay?: number;
  color: string;
}) {
  const tileNode = getTileNode(id);

  const { x, y } = tileNode!.getBoundingClientRect();
  const eventId = generateId();
  const damageEvent = {
    id: eventId,
    value,
    position: {
      x,
      y
    },
    color
  };

  if (delay) {
    yield* call(wait, delay);
  }

  yield* put(addDamageEventAction(damageEvent));
}

function* addDamageEvent({
  payload
}: {
  payload: {
    id: Trooper['id'];
    damage: number | string;
    damageType: DamageType;
    isCriticalDamage?: boolean;
    hasMissed?: boolean;
  };
}) {
  const { damage, id, isCriticalDamage, hasMissed, damageType } = payload;

  yield* call(publishDamageEvent, {
    id,
    value: getValue({
      value: damage,
      isCriticalDamage,
      hasMissed
    }),
    color: getColor({
      damageType,
      isCriticalDamage,
      hasMissed
    })
  });
}

export function* damageEventsSagaWatcher() {
  yield takeLatest(applyDamage, addDamageEvent);
}
