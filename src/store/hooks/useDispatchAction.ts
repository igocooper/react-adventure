import type { PayloadActionCreator } from '@reduxjs/toolkit';
import { useDispatch } from './index';
import { useCallback } from 'react';

export const useDispatchAction = <P, S extends string>(
  action: PayloadActionCreator<P, S>
) => {
  const dispatch = useDispatch();

  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    (...args: P extends void ? [] : [P]) => {
      dispatch(action(args[0]));
    },
    [dispatch, action]
  );
};
