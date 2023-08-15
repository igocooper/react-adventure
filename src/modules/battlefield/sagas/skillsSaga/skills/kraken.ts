import type { ApplySkillProps, Skill } from 'common/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SKILL, TARGET } from 'common/constants';
import { getDamage } from 'common/helpers';
import icon from './icons/kraken.png';
import { put, select, call } from 'typed-redux-saga';
import { activeTrooperSelector } from 'modules/battlefield/selectors';
import { modifyTrooper as modifyTrooperAction } from 'modules/battlefield/actions';
import { ATTACK_ID_KRAKEN } from 'modules/battlefield/characters/WaterMage/constants';
import { attack } from '../../attackSaga';

export const createKrakenSkill = ({
  damageMod,
  coolDown
}: {
  damageMod: number;
  coolDown: number;
}): Skill => ({
  iconSrc: icon,
  name: SKILL.KRAKEN,
  attackType: ATTACK_TYPE.SPLASH,
  target: TARGET.ENEMY,
  coolDown: coolDown,
  description: `${SKILL.KRAKEN}: Water Beast attacks all enemies for ${
    damageMod * 100
  }% of base trooper damage. Inflicts ${
    DAMAGE_TYPE.WATER
  } damage. CoolDown: ${coolDown}`,
  applySkill: function* ({ targetTrooper }: ApplySkillProps) {
    const activeTrooper = yield* select(activeTrooperSelector);

    if (!activeTrooper) return;

    const originalTrooperData = {
      attackId: activeTrooper.attackId,
      attackType: activeTrooper.attackType,
      damageType: activeTrooper.damageType,
      damage: activeTrooper.damage
    };

    const [minDamge, maxDamage] = getDamage(activeTrooper.damage);
    const damage = `${minDamge * damageMod}-${maxDamage * damageMod}`;

    yield* put(
      modifyTrooperAction({
        id: activeTrooper.id,
        team: activeTrooper.team,
        updates: {
          attackId: ATTACK_ID_KRAKEN,
          attackType: ATTACK_TYPE.SPLASH,
          damageType: DAMAGE_TYPE.WATER,
          damage
        }
      })
    );

    yield* call(attack, {
      payload: {
        id: targetTrooper.id,
        team: targetTrooper.team
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
