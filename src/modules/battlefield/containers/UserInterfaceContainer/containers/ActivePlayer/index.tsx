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
import { Effect } from '../../components/Effect';
import { Skill } from '../../components/Skill';
import {
  ActiveContainer,
  TrooperImage,
  Wrapper,
  WaitIcon,
  BlockIcon,
  Effects,
  Skills,
  ContainerInner
} from '../styled';
import type { Skill as SkillType } from 'common/types';

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
            <WaitIcon onClick={handleWait} disabled={hasWaited} />
            <BlockIcon onClick={handleBlock} />
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
        <Effects>
          {activeTrooper.effects.map(
            ({ name, iconSrc, duration, description }, index) => {
              return (
                <Effect
                  iconSrc={iconSrc}
                  key={`${name}-${index}`}
                  duration={duration}
                  description={description}
                  name={name}
                />
              );
            }
          )}
        </Effects>
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
