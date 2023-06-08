import React from 'react';
import { history } from './history';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import { path } from './constants';

import { MainScreen } from 'modules/mainScreen';
import { BattleField } from 'modules/battleField';
import { SpritesGeneratorContainer } from 'modules/sprites/containers/SpritesGeneratorContainer';

export const Router = () => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  <HistoryRouter history={history}>
    <Routes>
      <Route path={path.MAIN} element={<MainScreen />} />
      <Route path={path.BATTLEFIELD} element={<BattleField />} />
      <Route path={path.SPRITES} element={<SpritesGeneratorContainer />} />
    </Routes>
  </HistoryRouter>
);
