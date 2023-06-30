import { type ApplyEffectProps, type Effect } from 'modules/battlefield/types';
import { put } from 'typed-redux-saga';
import { applyDamage } from 'modules/battlefield/reducers/troopsSlice';

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
    yield* put(
      applyDamage({
        id: activeTrooper.id,
        damage,
        team: activeTrooper.team
      })
    );
  }
});
