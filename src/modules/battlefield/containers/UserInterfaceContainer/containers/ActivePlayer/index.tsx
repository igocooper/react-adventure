import React, { useCallback } from 'react';
import {
  activeSkillSelector,
  activeTeamNameSelector,
  activeTrooperSelector
} from 'modules/battlefield/selectors';
import {
  blockClicked,
  waitClicked,
  setActiveSkill
} from 'modules/battlefield/actions';
import { useDispatch, useSelector } from 'store/hooks';
import { Info } from '../../components/Info';
import { Effects } from '../../components/Effects';
import { Skill } from '../../components/Skill';
import {
  ActiveContainer,
  TrooperImage,
  Wrapper,
  WaitIcon,
  BlockIcon,
  Skills,
  ContainerInner
} from '../styled';
import type { Skill as SkillType } from 'common/types';
import SFX from 'modules/SFX';

type Props = {
  imageSrc?: string;
};

export const ActivePlayer = ({ imageSrc }: Props) => {
  const activeTrooper = useSelector(activeTrooperSelector);
  const activeTrooperTeamName = useSelector(activeTeamNameSelector);
  const activeSkill = useSelector(activeSkillSelector);
  const dispatch = useDispatch();
  const { id, team, hasWaited } = activeTrooper || {};

  const handleBlock = useCallback(() => {
    void SFX.click.play();
    if (id && team) {
      dispatch(
        blockClicked({
          id,
          team
        })
      );
    }
  }, [dispatch, id, team]);

  const handleWait = useCallback(() => {
    void SFX.click.play();
    if (id && team && !hasWaited) {
      dispatch(
        waitClicked({
          id,
          team
        })
      );
    }
  }, [dispatch, id, team]);

  const handleSkillClick = useCallback(
    (skill: SkillType) => {
      void SFX.click.play();
      dispatch(setActiveSkill(skill));
    },
    [dispatch, id, team]
  );

  if (!activeTrooper) {
    return null;
  }

  const healthLeft = Math.round(
    (activeTrooper.currentHealth / activeTrooper.health) * 100
  );

  return (
    <ActiveContainer $teamName={activeTrooperTeamName}>
      <ContainerInner>
        {imageSrc && (
          <Wrapper>
            <TrooperImage $src={imageSrc} $health={healthLeft} />
            <WaitIcon
              onClick={handleWait}
              disabled={hasWaited}
              onMouseOver={SFX.hover.play.bind(SFX.hover)}
            />
            <BlockIcon
              onClick={handleBlock}
              onMouseOver={SFX.hover.play.bind(SFX.hover)}
            />
          </Wrapper>
        )}
        <Info
          currentHealth={activeTrooper.currentHealth}
          health={activeTrooper.health}
          damage={activeTrooper.damage}
          damageType={activeTrooper.damageType}
          attackType={activeTrooper.attackType}
          hitChance={activeTrooper.hitChance}
          criticalChance={activeTrooper.criticalChance}
          evadeChance={activeTrooper.evadeChance}
          defence={activeTrooper.defence}
        />
        <Effects effects={activeTrooper.effects} />
      </ContainerInner>
      <Skills $teamName={activeTrooperTeamName}>
        {Object.entries(activeTrooper.skills || {}).map(
          ([skillName, skill], index) => {
            const { name } = skill;
            return (
              <Skill
                key={`${name}-${index}`}
                active={activeSkill?.name === skillName}
                onClick={handleSkillClick}
                {...skill}
              />
            );
          }
        )}
      </Skills>
    </ActiveContainer>
  );
};
