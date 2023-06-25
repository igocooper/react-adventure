import React from 'react';
import { MainTitle } from './components/MainTitle';
import { Options } from './components/Options';
import { Container } from './styled';

export const MainScreen = () => (
  <Container>
    <MainTitle title="React Adventure" />
    <Options />
  </Container>
);
