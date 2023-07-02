import React, { useCallback } from 'react';
import {
  activeTeamNameSelector,
  activeTrooperSelector
} from 'modules/battlefield/selectors';
import { blockClicked, waitClicked } from 'modules/battlefield/actions';
import { useDispatch, useSelector } from 'store/hooks';
import { Info } from '../../components/Info';
import { Effect } from '../../components/Effect';
import {
  ActiveContainer,
  TrooperImage,
  Wrapper,
  WaitIcon,
  BlockIcon,
  Effects
} from '../styled';

interface Props {
  imageSrc?: string;
}

export const ActivePlayer = ({ imageSrc }: Props) => {
  const activeTrooper = useSelector(activeTrooperSelector);
  const activeTrooperTeamName = useSelector(activeTeamNameSelector);
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

  if (!activeTrooper) {
    return null;
  }

  const healthLeft = Math.round(
    (activeTrooper.currentHealth / activeTrooper.health) * 100
  );

  return (
    <ActiveContainer $teamName={activeTrooperTeamName}>
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
        attackType={activeTrooper.attackType}
        initiative={activeTrooper.initiative}
        criticalChance={activeTrooper.criticalChance}
        evadeChance={activeTrooper.evadeChance}
      />
      <Effects>
        {activeTrooper.effects.map(({ name, iconSrc, duration }, index) => {
          return (
            <Effect
              iconSrc={iconSrc}
              key={`${name}-${index}`}
              duration={duration}
            />
          );
        })}
      </Effects>
    </ActiveContainer>
  );
};
