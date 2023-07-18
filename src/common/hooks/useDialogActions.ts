import { useDispatch } from '../../store/hooks';
import { useCallback } from 'react';
import {
  closeDialog as closeDialogAction,
  openDialog as openDialogAction
} from 'modules/dialogs/reducers/dialogsSlice';
import type { DialogProps } from 'modules/dialogs/reducers/dialogsSlice';

export const useDialogActions = () => {
  const dispatch = useDispatch();

  const closeDialog = useCallback(() => {
    dispatch(closeDialogAction());
  }, [dispatch]);

  const openDialog = useCallback(
    ({ type, dialogProps }: { type: string; dialogProps: DialogProps }) => {
      dispatch(
        openDialogAction({
          type,
          dialogProps
        })
      );
    },
    [dispatch]
  );

  return {
    closeDialog,
    openDialog
  };
};
