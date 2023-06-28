import { BorderOuter, BorderInner } from './styled';
import React from 'react';
import { Header } from './Header';
import { Spots } from './Spots';

interface Props {
  header: string;
  children: React.ReactNode;
  numberOfSpots?: number;
}

export const Border = ({ children, header, numberOfSpots }: Props) => (
  <BorderOuter>
    <Spots numberOfSpots={numberOfSpots} color="#6a3c2a" />
    <BorderInner>{children}</BorderInner>
    <Header header={header} />
  </BorderOuter>
);
