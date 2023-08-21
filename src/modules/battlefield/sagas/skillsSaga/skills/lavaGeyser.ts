import type { ApplySkillProps, Skill } from 'common/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SKILL, TARGET } from 'common/constants';
import { getDamage } from 'common/helpers';
import icon from './icons/lava-geyser.png';
import { put, select, call } from 'typed-redux-saga';
import { activeTrooperSelector } from 'modules/battlefield/selectors';
import { modifyTrooper as modifyTrooperAction } from 'modules/battlefield/actions';
import { ATTACK_ID_LAVA_GEYSER } from 'modules/battlefield/characters/MountainMage/constants';
import { attack } from '../../attackSaga';
import SFX from 'modules/SFX';

export const createLavaGeyserSkill = ({
  damageMod,
  coolDown
}: {
  damageMod: number;
  coolDown: number;
}): Skill => ({
  iconSrc: icon,
  name: SKILL.LAVA_GEYSER,
  attackType: ATTACK_TYPE.SPLASH,
  damageType: DAMAGE_TYPE.FIRE,
  target: TARGET.ENEMY,
  coolDown,
  description: `${
    SKILL.LAVA_GEYSER
  }: Erupt geyser of lava upon all enemies, deals ${
    damageMod * 100
  }% of base trooper damage. Inflicts ${
    DAMAGE_TYPE.FIRE
  } damage. CoolDown: ${coolDown}`,
  applySkill: function* ({ targetTrooper }: ApplySkillProps) {
    const activeTrooper = yield* select(activeTrooperSelector);

    if (!activeTrooper) return;

    const originalTrooperData = {
      attackId: activeTrooper.attackId,
      attackType: activeTrooper.attackType,
      damageType: activeTrooper.damageType,
      damage: activeTrooper.damage,
      castSFX: activeTrooper.castSFX
    };

    const [minDamage, maxDamage] = getDamage(activeTrooper.damage);
    const damage = `${minDamage * damageMod}-${maxDamage * damageMod}`;

    yield* put(
      modifyTrooperAction({
        id: activeTrooper.id,
        team: activeTrooper.team,
        updates: {
          attackId: ATTACK_ID_LAVA_GEYSER,
          attackType: ATTACK_TYPE.SPLASH,
          damageType: DAMAGE_TYPE.FIRE,
          damage,
          castSFX: SFX.lavaGeyser
        }
      })
    );

    yield* call(attack, {
      payload: {
        id: targetTrooper.id,
        team: targetTrooper.team,
        effectAnimationDelay: 400
      }
    });

    yield* put(
      modifyTrooperAction({
        id: activeTrooper.id,
        team: activeTrooper.team,
        updates: {
          ...originalTrooperData
        }
      })
    );
  }
});
