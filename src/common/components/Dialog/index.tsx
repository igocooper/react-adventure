import React from 'react';
import { Overlay, Content } from './styled';
import { Border } from './Border';
import { useKeyPress } from 'common/hooks/useKeyPress';

type Props = {
  header: string;
  onClose: () => void;
};

export const Dialog = ({ header, onClose }: Props) => {
  useKeyPress('Escape', onClose);

  return (
    <Overlay>
      <Border header={header}>
        <Content>This is content inside dialog example</Content>
      </Border>
    </Overlay>
  );
};
