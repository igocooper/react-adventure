import { registerDialog } from '../helpers/registerDialog';
import { dialogTypes } from '../constants';
import { InventoryDialogContainer } from 'common/containers/InventoryDialogContainer';

export const registerDialogs = () => {
  registerDialog(dialogTypes.INVENTORY, InventoryDialogContainer);
};
