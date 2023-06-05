import { createAction } from '@reduxjs/toolkit';

export const pushNextUrl = createAction<string>('router/push');

export const goBackAction = createAction<string>('router/back');
