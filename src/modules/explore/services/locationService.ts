import { castleLocationMock, villageLocationMock } from './mocks/location';
import { wait } from 'common/helpers';

export const locationService = {
  getLocation: async (location: string) => {
    await wait(300);
    switch (location) {
      case 'village': {
        return villageLocationMock;
      }

      case 'castle-test': {
        return castleLocationMock;
      }
      default:
        return villageLocationMock;
    }
  }
};
