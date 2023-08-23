import type { Skill } from 'common/types';
import { CHARACTER_IMAGE_SLOT, SKILL, TARGET } from 'common/constants';
import icon from './icons/divineHeal.png';
import { put, select, call, fork, all } from 'typed-redux-saga';
import {
  activeTeamSelector,
  activeTrooperSelector
} from 'modules/battlefield/selectors';
import { getTrooperAnimationInstance } from 'modules/animation/troopersAnimationInstances';
import {
  getRandomNumberInRange,
  updateCharacterImages,
  wait
} from 'common/helpers';
import SFX from 'modules/SFX';
import { publishDamageEvent } from '../../damageEventsSaga';
import theme from 'theme/defaultTheme';
import { applyHeal } from 'modules/battlefield/reducers/troopsSlice';
import { getAreaEffectAnimationInstance } from '../../../../animation/areaEffectsAnimationInstances';

export const createDivineHealSkill = ({
  coolDown = 1
}: { coolDown?: number } = {}): Skill => ({
  iconSrc: icon,
  name: SKILL.DIVINE_HEAL,
  target: TARGET.ALLY,
  coolDown,
  description: `${SKILL.DIVINE_HEAL}: heals all allies. Cooldown: ${coolDown}`,
  applySkill: function* () {
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!activeTrooper) return;

    const activeTrooperAnimationInstance = yield* call(
      getTrooperAnimationInstance,
      activeTrooper.id
    );
    const divineHealAnimation = yield* call(
      getAreaEffectAnimationInstance,
      SKILL.DIVINE_HEAL
    );

    const activeTrooperTeam = yield* select(activeTeamSelector);

    yield* call(
      updateCharacterImages,
      [
        {
          url: '/images/effects/holy.png',
          itemSlot: CHARACTER_IMAGE_SLOT.EFFECT
        }
      ],
      activeTrooper.id
    );

    void SFX.heal.play();

    yield* all([
      call([activeTrooperAnimationInstance!, 'effected']),
      call(divineHealAnimation!.play)
    ]);

    for (const trooper of activeTrooperTeam) {
      yield* call(wait, getRandomNumberInRange(0, 200));
      const targetTrooperAnimationInstance = yield* call(
        getTrooperAnimationInstance,
        trooper.id
      );

      let heal = activeTrooper.healPower || 1;

      const reachedMaxHP = heal + trooper.currentHealth > trooper.health;

      if (reachedMaxHP) {
        heal = trooper.health - trooper.currentHealth;
      }

      yield* call(
        updateCharacterImages,
        [
          {
            url: '/images/effects/heal.png',
            itemSlot: CHARACTER_IMAGE_SLOT.EFFECT
          }
        ],
        trooper.id
      );

      yield* fork(publishDamageEvent, {
        id: trooper.id,
        value: `+${heal}`,
        color: theme.colors.heal,
        delay: 400
      });

      yield* put(
        applyHeal({
          id: trooper.id,
          team: trooper.team,
          heal
        })
      );

      void SFX.healed.play();
      yield* fork([targetTrooperAnimationInstance!, 'effected']);
    }
  }
});
