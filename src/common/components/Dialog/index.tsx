import React from 'react';
import { Overlay, Content } from './styled';
import { Border } from './Border';

interface Props {
  header: string;
}

export const Dialog = ({ header }: Props) => {
  return (
    <Overlay>
      <Border header={header}>
        <Content>This is content inside dialog example</Content>
      </Border>
    </Overlay>
  );
};
