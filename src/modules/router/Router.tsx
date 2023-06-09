import React from 'react';
import { history } from './history';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import { path } from './constants';

import { MainScreen } from 'modules/mainScreen';
import { BattlefieldContainer } from 'modules/battlefield/containers/BattlefieldContainer';
import { SpritesGeneratorContainer } from 'modules/sprites/containers/SpritesGeneratorContainer';
import { WardrobeContainer } from 'modules/wardrobe/containers/WardrobeContainer';

export const Router = () => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  <HistoryRouter history={history}>
    <Routes>
      <Route path={path.MAIN} element={<MainScreen />} />
      <Route path={path.BATTLEFIELD} element={<BattlefieldContainer />} />
      <Route path={path.SPRITES} element={<SpritesGeneratorContainer />} />
      <Route path={path.WARDROBE} element={<WardrobeContainer />} />
    </Routes>
  </HistoryRouter>
);
