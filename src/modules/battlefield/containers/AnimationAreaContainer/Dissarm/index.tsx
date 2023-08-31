import React, { useEffect, useState } from 'react';
import { RightWeapon, LeftWeapon, Bow, DissarmEffect } from './styled';
import { registerAreaEffect } from 'modules/animation/areaEffectsAnimationInstances';
import type { Trooper } from 'modules/battlefield/types';
import { SKILL } from 'common/constants';
import { getElementBoundsWithinContainer, wait } from 'common/helpers';
import { getTrooperNode } from '../../../troopersNodesMap';
import type { WeaponType } from 'common/types';

interface Props {
  containerNode: HTMLDivElement;
  trooperId?: Trooper['id'];
}

type Weapon = {
  src: string;
  type: WeaponType;
};

export type DissarmedEquipment = {
  leftHand?: Weapon;
  rightHand?: Weapon;
  bow?: Weapon;
};

const ANIMATION_DURATION = 500;
export const Dissarm = React.memo(({ containerNode }: Props) => {
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({});
  const [droppedWeapon, setDroppedWeapon] = useState<
    Record<number, DissarmedEquipment | null>
  >({});

  useEffect(() => {
    registerAreaEffect(SKILL.DISSARM, {
      play: async function (id) {
        if (typeof id === 'number') {
          setIsPlaying((state) => ({
            ...state,
            [id]: true
          }));
          await wait(ANIMATION_DURATION);
          setIsPlaying((state) => ({
            ...state,
            [id]: false
          }));
        }
      },
      remove: (id: number) => {
        setDroppedWeapon((state) => ({
          ...state,
          [id]: null
        }));
      },
      add: (id, equipment) => {
        setDroppedWeapon((state) => ({
          ...state,
          [id]: equipment
        }));
      }
    });
  }, []);

  return (
    <>
      {Object.entries(droppedWeapon).map(([id, equipment]) => {
        if (!equipment) return null;

        const targetNode = getTrooperNode(Number(id));
        const targetBounds = getElementBoundsWithinContainer(
          targetNode!,
          containerNode
        );
        const x = targetBounds.left + targetBounds.width / 2;
        const y = targetBounds.top + targetBounds.height / 2;
        const position = { x, y };

        return (
          <DissarmEffect
            key={id}
            active={Boolean(isPlaying[Number(id)])}
            animationSpeed={
              equipment.rightHand && equipment.leftHand
                ? ANIMATION_DURATION + ANIMATION_DURATION / 2
                : ANIMATION_DURATION
            }
            position={position}
          >
            {equipment.rightHand && (
              <RightWeapon
                src={equipment.rightHand.src}
                active={Boolean(isPlaying[Number(id)])}
                delay={
                  equipment.rightHand && equipment.leftHand
                    ? ANIMATION_DURATION / 2
                    : 0
                }
                animationSpeed={ANIMATION_DURATION}
              />
            )}
            {equipment.leftHand && (
              <LeftWeapon
                src={equipment.leftHand.src}
                active={Boolean(isPlaying[Number(id)])}
                animationSpeed={ANIMATION_DURATION}
              />
            )}
            {equipment.bow && (
              <Bow
                src={equipment.bow.src}
                active={Boolean(isPlaying[Number(id)])}
                animationSpeed={ANIMATION_DURATION}
              />
            )}
          </DissarmEffect>
        );
      })}
    </>
  );
});
