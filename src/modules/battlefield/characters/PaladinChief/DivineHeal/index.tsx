import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'store/hooks';
import { activeTeamNameSelector } from 'modules/battlefield/selectors';
import { TROOPER_TEAM } from 'modules/battlefield/constants';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import { SKILL } from 'common/constants';
import { getRandomNumberInRange, wait } from 'common/helpers';
import { DivineHealEffect, HealParticle } from './styled';

type Props = {
  containerNode: HTMLElement;
};

const DIVINE_HEAL_ANIMATION_DURATION = 1500;

export const DivineHeal = ({ containerNode }: Props) => {
  const activeTeam = useSelector(activeTeamNameSelector);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    registerAreaEffect(SKILL.DIVINE_HEAL, {
      play: async function () {
        setIsPlaying(true);
        await wait(DIVINE_HEAL_ANIMATION_DURATION); // should equal animation duration in BleedingEffect in styled
        setIsPlaying(false);
      }
    });
  }, []);

  if (!containerNode) return null;

  const containerBounds = containerNode.getBoundingClientRect();
  const healZoneW = 400;
  const healZoneH = containerBounds.height;
  const x =
    activeTeam === TROOPER_TEAM.ATTACKERS
      ? 0
      : containerBounds.width - healZoneW;
  const y = 0;
  const position = { x, y };

  return createPortal(
    <DivineHealEffect
      position={position}
      active={true}
      width={healZoneW}
      height={healZoneH}
    >
      {isPlaying &&
        new Array(40).fill(0).map((_, index) => (
          <HealParticle
            key={`particle-${index}`}
            active={isPlaying}
            animationSpeed={DIVINE_HEAL_ANIMATION_DURATION}
            animationDelay={getRandomNumberInRange(0, 1000)}
            position={{
              x: getRandomNumberInRange(0, healZoneW),
              y: getRandomNumberInRange(0, healZoneH)
            }}
            width={20}
            height={20}
          />
        ))}
    </DivineHealEffect>,
    containerNode
  );
};
