import type { ApplyEffectProps, DamageType } from 'common/types';
import { call, fork, put, select } from 'typed-redux-saga';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import {
  applyDamage,
  removeAllEffects
} from 'modules/battlefield/reducers/troopsSlice';
import { applyDefenceAndResistance } from 'common/helpers/applyDefenceAndResistance';
import { finishTrooperTurn } from 'modules/battlefield/actions';
import { playEffectedAnimation } from 'modules/battlefield/helpers/playEffectedAnimation';
import { makeCharacterByIdSelector } from 'modules/battlefield/selectors';

export const createApplyDamageEffect = ({
  damage,
  damageType,
  characterEffectImgSrc,
  sfx
}: {
  damage: number;
  damageType: DamageType;
  characterEffectImgSrc: string;
  sfx?: () => void;
}) =>
  function* ({ targetTrooperId }: ApplyEffectProps) {
    const activeTrooper = yield* select(
      makeCharacterByIdSelector(targetTrooperId)
    );
    if (!activeTrooper) return;

    const isDying = damage >= activeTrooper.currentHealth;
    const activeTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      activeTrooper.id
    );

    yield* put(
      applyDamage({
        id: activeTrooper.id,
        damage: applyDefenceAndResistance(damage, damageType, activeTrooper),
        damageType,
        team: activeTrooper.team
      })
    );

    if (isDying) {
      if (sfx) {
        yield* call(sfx);
      }
      yield* call(
        playEffectedAnimation,
        activeTrooper.id,
        characterEffectImgSrc
      );
      yield* fork([activeTrooperAnimationInstance!, 'die']);
      yield* put(
        removeAllEffects({
          id: activeTrooper.id,
          team: activeTrooper.team
        })
      );
      yield* put(finishTrooperTurn());
    } else {
      if (sfx) {
        yield* call(sfx);
      }
      yield* call(
        playEffectedAnimation,
        activeTrooper.id,
        characterEffectImgSrc
      );
    }
  };
