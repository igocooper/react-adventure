import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatchAction } from 'store/hooks';
import {
  startRound as startRoundAction,
  setTroopersToLoad as setTroopersToLoadAction,
  resetBattlefieldLoadedStatus,
  setActiveSkill as setActiveSkillAction
} from '../../actions';
import {
  attackersSelector,
  battlefieldDisabledStatusSelector,
  battlefieldLoadedStatusSelector,
  battleFieldTroopersToLoadSelector,
  cursorSelector,
  defendersSelector
} from '../../selectors';
import { Location, Battlefield } from './styled';
import type { Trooper } from '../../types';
import { useLocation } from 'common/hooks/useLocation';
import { TileContainer } from '../TileContainer';
import { AnimationAreaContainer } from '../AnimationAreaContainer';
import { UserInterfaceContainer } from '../UserInterfaceContainer';
import { SoundControl } from '../SoundControl';

export const BattlefieldContainer = () => {
  const attackers = useSelector(attackersSelector);
  const defenders = useSelector(defendersSelector);
  const isBattleFieldDisabled = useSelector(battlefieldDisabledStatusSelector);
  const cursor = useSelector(cursorSelector);
  const troopersToLoad = useSelector(battleFieldTroopersToLoadSelector);
  const battleFieldLoaded = useSelector(battlefieldLoadedStatusSelector);
  const startRound = useDispatchAction(startRoundAction);
  const setActiveSkill = useDispatchAction(setActiveSkillAction);
  const setTroopersToLoad = useDispatchAction(setTroopersToLoadAction);
  const resetBattleFieldLoadedStatus = useDispatchAction(
    resetBattlefieldLoadedStatus
  );

  const location = useLocation();

  const resetActiveSkill = useCallback(() => {
    setActiveSkill(null);
  }, [setActiveSkill]);

  useEffect(() => {
    setTroopersToLoad(troopersToLoad);

    return () => {
      resetBattleFieldLoadedStatus();
    };
  }, []);

  useEffect(() => {
    if (battleFieldLoaded) {
      startRound(1);
    }
  }, [battleFieldLoaded]);

  return (
    <Battlefield $disabled={isBattleFieldDisabled} onClick={resetActiveSkill}>
      <SoundControl />
      <Location $cursor={cursor} $location={location}>
        <AnimationAreaContainer>
          {attackers.map(
            ({
              id,
              position,
              type,
              team,
              currentHealth,
              health,
              equipment,
              appearance,
              damageType,
              attackId,
              sex
            }: Trooper) => (
              <TileContainer
                key={id}
                type={type}
                id={id}
                currentHealth={currentHealth}
                health={health}
                position={position}
                team={team}
                equipment={equipment}
                appearance={appearance}
                damageType={damageType}
                attackId={attackId}
                sex={sex}
              />
            )
          )}
          {defenders.map(
            ({
              id,
              position,
              type,
              team,
              currentHealth,
              health,
              equipment,
              appearance,
              damageType,
              attackId,
              sex
            }: Trooper) => (
              <TileContainer
                key={id}
                type={type}
                id={id}
                currentHealth={currentHealth}
                health={health}
                position={position}
                team={team}
                equipment={equipment}
                appearance={appearance}
                damageType={damageType}
                attackId={attackId}
                sex={sex}
              />
            )
          )}
        </AnimationAreaContainer>
        <UserInterfaceContainer />
      </Location>
    </Battlefield>
  );
};
