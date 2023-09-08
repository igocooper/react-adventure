import { useSearchParams } from 'react-router-dom';
import type { LocationName } from 'modules/battlefield/types';
import { LOCATION } from 'modules/battlefield/constants';

function isLocationGuard(location: string): location is LocationName {
  const availableLocations = Object.values(LOCATION);

  return availableLocations.includes(location as LOCATION);
}

export const useLocationFromSearchParams = () => {
  const [searchParams] = useSearchParams();

  const locationParam = searchParams.get('location');

  return locationParam && isLocationGuard(locationParam)
    ? locationParam
    : LOCATION.ICE_ARENA;
};
