import React from 'react';
import { history } from './history';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import { path } from './constants';

import { MainScreen } from 'modules/mainScreen';
import { BattleFieldContainer } from 'modules/battlefield/containers/BattlefieldContainer';
import { SpritesGeneratorContainer } from 'modules/sprites/containers/SpritesGeneratorContainer';

export const Router = () => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  <HistoryRouter history={history}>
    <Routes>
      <Route path={path.MAIN} element={<MainScreen />} />
      <Route path={path.BATTLEFIELD} element={<BattleFieldContainer />} />
      <Route path={path.SPRITES} element={<SpritesGeneratorContainer />} />
    </Routes>
  </HistoryRouter>
);
