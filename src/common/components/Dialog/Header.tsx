import {
  CornerInner,
  CornerLeft,
  CornerRight,
  HeaderContent,
  HeaderContainer
} from './styled';
import React from 'react';

type Props = {
  header: string;
};

export const Header = ({ header }: Props) => (
  <>
    <CornerLeft>
      <CornerInner />
    </CornerLeft>
    <CornerRight>
      <CornerInner />
    </CornerRight>
    <HeaderContainer>
      <HeaderContent>{header}</HeaderContent>
    </HeaderContainer>
  </>
);
