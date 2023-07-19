import React from 'react';
import type { JSX } from 'react';
import { Overlay, Content } from './styled';
import { Border } from './Border';
import { useKeyPress } from 'common/hooks/useKeyPress';

type Props = {
  header: string;
  onClose: () => void;
  children: JSX.Element | string;
};

export const Dialog = ({ header, onClose, children }: Props) => {
  useKeyPress('Escape', onClose);

  return (
    <Overlay>
      <Border header={header}>
        <Content>{children}</Content>
      </Border>
    </Overlay>
  );
};
