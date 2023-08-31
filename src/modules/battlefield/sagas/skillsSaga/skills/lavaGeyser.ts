import type { ApplySkillProps, Skill } from 'common/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SKILL, TARGET } from 'common/constants';
import icon from './icons/lava-geyser.png';
import { put, select, call } from 'typed-redux-saga';
import {
  activeTrooperSelector,
  makeCharacterByIdSelector
} from 'modules/battlefield/selectors';
import { modifyTrooper as modifyTrooperAction } from 'modules/battlefield/actions';
import { ATTACK_ID_LAVA_GEYSER } from 'modules/battlefield/characters/MountainMage/constants';
import { attack } from '../../attackSaga';
import SFX from 'modules/SFX';
import { getPercentOfBaseDamage } from 'modules/battlefield/helpers/getPercentOfBaseDamage';

export const createLavaGeyserSkill = ({
  percent,
  coolDown
}: {
  percent: number;
  coolDown: number;
}): Skill => ({
  iconSrc: icon,
  name: SKILL.LAVA_GEYSER,
  attackType: ATTACK_TYPE.SPLASH,
  damageType: DAMAGE_TYPE.FIRE,
  target: TARGET.ALL_ENEMIES,
  coolDown,
  description: `${SKILL.LAVA_GEYSER}: Erupt geyser of lava upon all enemies, deals ${percent}% of base trooper damage. Inflicts ${DAMAGE_TYPE.FIRE} damage. CoolDown: ${coolDown}`,
  applySkill: function* ({ targetTrooperId }: ApplySkillProps) {
    const targetTrooper = yield* select(
      makeCharacterByIdSelector(targetTrooperId)
    );
    const activeTrooper = yield* select(activeTrooperSelector);
    if (!targetTrooper || !activeTrooper) return;

    const originalTrooperData = {
      attackId: activeTrooper.attackId,
      attackType: activeTrooper.attackType,
      damageType: activeTrooper.damageType,
      damage: activeTrooper.damage,
      castSFX: activeTrooper.castSFX
    };

    const [minDamage, maxDamage] = getPercentOfBaseDamage(
      activeTrooper.damage,
      percent
    );
    const damage = `${minDamage}-${maxDamage}`;

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
