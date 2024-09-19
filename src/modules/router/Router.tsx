import React from 'react';
import { history } from './history';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import { path } from './constants';

import { MainScreen } from 'modules/mainScreen';
import { Demo } from 'modules/demo';
import { BattlefieldContainer } from 'modules/battlefield/containers/BattlefieldContainer';
import { SpritesGeneratorContainer } from 'modules/sprites/containers/SpritesGeneratorContainer';
import { DialogsContainer } from 'modules/dialogs/containers/DialogsContainer';
import { resolveRouterBaseName } from 'common/helpers/resolveRouterBaseName';

export const Router = () => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  <HistoryRouter history={history} basename={resolveRouterBaseName()}>
    <Routes>
      <Route path={path.MAIN} element={<MainScreen />} />
      <Route path="/demo" element={<Demo />} />
      <Route path={path.BATTLEFIELD} element={<BattlefieldContainer />} />
      <Route path={path.SPRITES} element={<SpritesGeneratorContainer />} />
    </Routes>
    <DialogsContainer />
  </HistoryRouter>
);
