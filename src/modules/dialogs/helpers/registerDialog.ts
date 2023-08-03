import type { ReactNode } from 'react';
import registeredDialogs from '../registered-dialogs';

export const registerDialog = (
  type: string,
  component: CallableFunction | ReactNode
) => {
  if (registeredDialogs.has(type)) {
    throw new Error(`Dialog with type ${type} is already registered.`);
  }

  registeredDialogs.set(type, component);
};
