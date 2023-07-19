import { BorderOuter, BorderInner } from './styled';
import React from 'react';
import { Header } from './Header';
import { Spots } from './Spots';
import theme from 'theme/defaultTheme';

type Props = {
  header: string;
  children: React.ReactNode;
  numberOfSpots?: number;
};

export const Border = ({ children, header, numberOfSpots }: Props) => (
  <BorderOuter>
    <Spots numberOfSpots={numberOfSpots} color={theme.dialog.spotColor} />
    <BorderInner>{children}</BorderInner>
    <Header header={header} />
  </BorderOuter>
);
