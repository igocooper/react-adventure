import { useSearchParams } from 'react-router-dom';
import type { LocationName } from 'modules/battlefield/types';
import { LOCATION } from 'modules/battlefield/constants';

function isLocationGuard(location: string): location is LocationName {
  const availableLocations = Object.values(LOCATION);

  return availableLocations.includes(location as LOCATION);
}

export const useLocation = () => {
  const [searchParams] = useSearchParams();

  const location = searchParams.get('location');

  return location && isLocationGuard(location)
    ? location
    : LOCATION.FOREST_ROAD;
};
