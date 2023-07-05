import React, { useEffect, useRef } from 'react';
import { registerEffectNode } from '../../effectsNodesMap';
import { type Trooper } from '../../types';
import { Effect } from './styled';

type Props = Pick<Trooper, 'id'> & {
  children: React.ReactNode;
};

export const EffectContainer = ({ id, children }: Props) => {
  const effectNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerEffectNode(id, effectNodeRef.current!);
  }, []);

  return <Effect ref={effectNodeRef}>{children}</Effect>;
};
