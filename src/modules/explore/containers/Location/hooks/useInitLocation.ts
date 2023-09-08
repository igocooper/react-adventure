import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'store/hooks';
import { useLocation } from 'common/hooks/useLocation';
import {
  initLocation,
  setLocationBounds as setLocationBoundsAction,
  setViewportBounds as setViewportBoundsAction
} from 'modules/explore/actions';
import { locationInitializedSelector } from 'modules/explore/selectors';

type Props = {
  locationRef: React.RefObject<HTMLDivElement>;
  viewportRef: React.RefObject<HTMLDivElement>;
};

export const useInitLocation = ({ viewportRef, locationRef }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const initialized = useSelector(locationInitializedSelector);

  useEffect(() => {
    dispatch(initLocation(location));
  }, []);

  useEffect(() => {
    const viewportBounds = viewportRef.current!.getBoundingClientRect();
    const locationBounds = locationRef.current!.getBoundingClientRect();

    dispatch(setLocationBoundsAction(locationBounds));
    dispatch(setViewportBoundsAction(viewportBounds));
  }, [initialized]);
};
