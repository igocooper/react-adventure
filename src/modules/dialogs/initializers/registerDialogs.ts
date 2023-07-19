import { registerDialog } from '../helpers/registerDialog';
import { dialogTypes } from '../constants';
import { InventoryDialogContainer } from 'common/containers/InventoryDialogContainer';
import { CharacterDetailsDialogContainer } from 'modules/battlefield/dialogs/CharacterDetailsDialogContainer';

export const registerDialogs = () => {
  registerDialog(dialogTypes.INVENTORY, InventoryDialogContainer);
  registerDialog(
    dialogTypes.CHARACTER_DETAILS,
    CharacterDetailsDialogContainer
  );
};
