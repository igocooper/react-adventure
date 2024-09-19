import type { Skill } from 'common/types';
import { SKILL, TARGET } from 'common/constants';
import icon from './icons/divineHeal.png';
import { put, select, call, fork, all } from 'typed-redux-saga';
import {
  activeTeamSelector,
  activeTrooperSelector
} from 'modules/battlefield/selectors';
import { getRandomNumberInRange, wait } from 'common/helpers';
import SFX from 'modules/SFX';
import { publishDamageEvent } from '../../damageEventsSaga';
import theme from 'theme/defaultTheme';
import { applyHeal } from 'modules/battlefield/reducers/troopsSlice';
import { getAreaEffectAnimationInstance } from 'modules/animation/areaEffectsAnimationInstances';
import { playEffectedAnimation } from 'modules/battlefield/helpers/playEffectedAnimation';
import { resolveAssetUrl } from 'common/helpers/resolveAssetUrl';

export const createDivineHealSkill = ({
  coolDown = 1
}: { coolDown?: number } = {}): Skill => ({
  iconSrc: icon,
  name: SKILL.DIVINE_HEAL,
  target: TARGET.ALL_ALLIES,
  coolDown,
  description: `${SKILL.DIVINE_HEAL}: heals all allies. Cooldown: ${coolDown}`,
  applySkill: function* () {
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!activeTrooper) return;

    const divineHealAnimation = yield* call(
      getAreaEffectAnimationInstance,
      SKILL.DIVINE_HEAL
    );

    const activeTrooperTeam = yield* select(activeTeamSelector);
    const aliveTeamMembers = activeTrooperTeam.filter(
      (trooper) => trooper.currentHealth > 0
    );
    void SFX.heal.play();

    yield* all([
      call(
        playEffectedAnimation,
        activeTrooper.id,
        resolveAssetUrl('/images/effects/holy.png')
      ),
      call(divineHealAnimation!.play)
    ]);

    for (const trooper of aliveTeamMembers) {
      yield* call(wait, getRandomNumberInRange(0, 200));
      let heal = activeTrooper.healPower || 1;

      const reachedMaxHP = heal + trooper.currentHealth > trooper.health;

      if (reachedMaxHP) {
        heal = trooper.health - trooper.currentHealth;
      }

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
      yield* fork(
        playEffectedAnimation,
        trooper.id,
        resolveAssetUrl('/images/effects/heal.png')
      );
    }
  }
});
