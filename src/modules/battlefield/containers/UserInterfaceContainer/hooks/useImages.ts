import { useRef, useEffect } from 'react';
import { useSelector } from 'store/hooks';
import {
  attackersSelector,
  battlefieldLoadedStatusSelector,
  defendersSelector
} from 'modules/battlefield/selectors';
import type { Trooper } from 'modules/battlefield/types';
import { getTrooperAnimationInstance } from '../../../../animation/troopersAnimationInstances';

export const useImages = () => {
  const imageMapRef =
    useRef<Nullable<Record<Trooper['id'], string | undefined>>>(null);
  const defenders = useSelector(defendersSelector);
  const attackers = useSelector(attackersSelector);
  const battleFieldLoaded = useSelector(battlefieldLoadedStatusSelector);

  useEffect(() => {
    if (battleFieldLoaded) {
      imageMapRef.current = [...defenders, ...attackers].reduce(
        (
          result: Record<Trooper['id'], string | undefined>,
          trooper: Trooper
        ) => {
          return {
            ...result,
            [trooper.id]: getTrooperAnimationInstance(trooper.id)?.getImage()
          };
        },
        {}
      );
    }
  }, [battleFieldLoaded]);

  return imageMapRef.current;
};
