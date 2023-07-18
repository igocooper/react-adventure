import registeredDialogs from '../registered-dialogs';

export const getDialogByType = (type: string) => registeredDialogs.get(type);
