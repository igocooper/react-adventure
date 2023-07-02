import { type ApplyEffectProps, type Effect } from 'modules/battlefield/types';
import { call, put, fork } from 'typed-redux-saga';
import {
  applyDamage,
  finishTrooperTurn,
  removeAllEffects
} from 'modules/battlefield/actions';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import poisonIcon from './icons/poison.png';

export const createPoisonEffect = ({
  duration,
  damage
}: {
  duration: number;
  damage: number;
}): Effect => ({
  name: 'poison',
  duration,
  done: false,
  applyEffect: function* ({ activeTrooper }: ApplyEffectProps) {
    const isDying = damage >= activeTrooper.currentHealth;
    const activeTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      activeTrooper.id
    );

    if (damage >= activeTrooper.currentHealth) {
      damage = damage - (damage - activeTrooper.currentHealth);
    }

    yield* put(
      applyDamage({
        id: activeTrooper.id,
        damage,
        team: activeTrooper.team,
        isPoison: true
      })
    );

    if (isDying) {
      yield* fork([activeTrooperAnimationInstance!, 'die']);
      yield* put(
        removeAllEffects({
          id: activeTrooper.id,
          team: activeTrooper.team
        })
      );
      yield* put(finishTrooperTurn());
    } else {
      yield* fork([activeTrooperAnimationInstance!, 'hurt']);
    }
  },
  iconSrc: poisonIcon
});
