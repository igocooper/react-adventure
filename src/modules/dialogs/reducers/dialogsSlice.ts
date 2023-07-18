import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type DialogProps = {
  header?: string;
};

type DialogState = {
  type: Nullable<string>;
  dialogProps: DialogProps;
};

type OpenDialogPayload = {
  type: string;
  dialogProps?: DialogProps;
};

const initialState: DialogState = {
  type: null,
  dialogProps: {}
};

export const dialogsSlice = createSlice({
  name: 'cursor',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<OpenDialogPayload>) => {
      const { type, dialogProps } = action.payload;
      return {
        ...state,
        type,
        ...(dialogProps ? { dialogProps } : {})
      };
    },
    closeDialog: (state) => {
      return {
        ...state,
        type: null,
        dialogProps: {}
      };
    }
  }
});

export const { openDialog, closeDialog } = dialogsSlice.actions;

export const dialogsReducer = dialogsSlice.reducer;
