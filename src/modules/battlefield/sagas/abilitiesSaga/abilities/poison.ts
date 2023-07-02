import type { Ability, ApplyAbilityProps } from 'modules/battlefield/types';
import { put } from 'typed-redux-saga';
import { addEffect } from 'modules/battlefield/reducers/troopsSlice';
import { createPoisonEffect } from '../../effectsSaga/effects';
import { getRandomNumberInRange } from 'common/helpers';

export const createPoisonAbility = ({
  duration,
  damage,
  hitChance
}: {
  duration: number;
  damage: number;
  hitChance: number;
}): Ability => ({
  name: 'poison',
  hitChance,
  applyAbility: function* ({ targetTrooper }: ApplyAbilityProps) {
    const roll = getRandomNumberInRange(1, 100);

    if (roll <= hitChance) {
      const poisonEffect = createPoisonEffect({
        damage,
        duration
      });

      yield* put(
        addEffect({
          id: targetTrooper.id,
          team: targetTrooper.team,
          effect: poisonEffect
        })
      );
    }
  }
});
