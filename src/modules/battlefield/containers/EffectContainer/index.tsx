import React, { useEffect, useRef } from 'react';
import { registerEffectNode } from '../../effectsNodesMap';
import type { Trooper } from '../../types';
import { Effect } from './styled';

type Props = Pick<Trooper, 'id'> & {
  children: React.ReactNode;
};

// This is just a wrapper node around Trooper in Battlefield used to apply different transforms to visualise effects, e.g. transform scale in "Might" effect
export const EffectContainer = ({ id, children }: Props) => {
  const effectNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerEffectNode(id, effectNodeRef.current!);
  }, []);

  return <Effect ref={effectNodeRef}>{children}</Effect>;
};
