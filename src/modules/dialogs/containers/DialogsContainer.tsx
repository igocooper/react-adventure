import React from 'react';
import { getDialogByType } from '../helpers/getDialogByType';
import { dialogTypeSelector, dialogPropsSelector } from '../selectors';
import { useSelector } from 'store/hooks';
import { registerDialogs } from '../initializers/registerDialogs';

registerDialogs();

export const DialogsContainer = () => {
  const type = useSelector(dialogTypeSelector);
  const dialogProps = useSelector(dialogPropsSelector);

  const DialogComponent = type && getDialogByType(type);

  if (!DialogComponent) {
    return null;
  }

  return <DialogComponent {...dialogProps} />;
};
