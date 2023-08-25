import type { ApplySkillProps, Skill } from 'common/types';
import { ATTACK_TYPE, DAMAGE_TYPE, SKILL, TARGET } from 'common/constants';
import { getDamage } from 'common/helpers';
import icon from './icons/kraken.png';
import { put, select, call } from 'typed-redux-saga';
import {
  activeTrooperSelector,
  makeCharacterByIdSelector
} from 'modules/battlefield/selectors';
import { modifyTrooper as modifyTrooperAction } from 'modules/battlefield/actions';
import { ATTACK_ID_KRAKEN } from 'modules/battlefield/characters/WaterMage/constants';
import { attack } from '../../attackSaga';
import SFX from 'modules/SFX';

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
  damageType: DAMAGE_TYPE.WATER,
  target: TARGET.ALL_ENEMIES,
  coolDown,
  description: `${SKILL.KRAKEN}: Water Beast attacks all enemies for ${
    damageMod * 100
  }% of base trooper damage. Inflicts ${
    DAMAGE_TYPE.WATER
  } damage. CoolDown: ${coolDown}`,
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

    const [minDamge, maxDamage] = getDamage(activeTrooper.damage);
    const damage = `${minDamge * damageMod}-${maxDamage * damageMod}`;
    const castSFX: HTMLAudioElement = {
      play: async () => {
        void SFX.kraken.play();
        void SFX.waterSpell.play();
      }
    } as HTMLAudioElement;
    yield* put(
      modifyTrooperAction({
        id: activeTrooper.id,
        team: activeTrooper.team,
        updates: {
          attackId: ATTACK_ID_KRAKEN,
          castSFX,
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
