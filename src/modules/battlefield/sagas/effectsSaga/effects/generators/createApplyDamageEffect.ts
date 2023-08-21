import type { ApplyEffectProps, DamageType } from 'common/types';
import { call, fork, put } from 'typed-redux-saga';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import { updateCharacterImages } from 'common/helpers';
import { CHARACTER_IMAGE_SLOT } from 'common/constants';
import {
  applyDamage,
  removeAllEffects
} from 'modules/battlefield/reducers/troopsSlice';
import { applyDefenceAndResistance } from 'common/helpers/applyDefenceAndResistance';
import { finishTrooperTurn } from 'modules/battlefield/actions';

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
  function* ({ activeTrooper }: ApplyEffectProps) {
    const isDying = damage >= activeTrooper.currentHealth;
    const activeTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      activeTrooper.id
    );

    if (damage >= activeTrooper.currentHealth) {
      damage = damage - (damage - activeTrooper.currentHealth);
    }

    yield* call(
      updateCharacterImages,
      [
        {
          url: characterEffectImgSrc,
          itemSlot: CHARACTER_IMAGE_SLOT.EFFECT
        }
      ],
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
      yield* call([activeTrooperAnimationInstance!, 'effected']);
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
      yield* call([activeTrooperAnimationInstance!, 'effected']);
    }
  };
