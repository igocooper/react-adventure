import React from 'react';
import { Dialog } from 'common/components/Dialog';
import { useDialogActions } from 'common/hooks/useDialogActions';

export const InventoryDialogContainer = () => {
  const { closeDialog } = useDialogActions();

  return <Dialog header="Inventory" onClose={closeDialog} />;
};
