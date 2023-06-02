import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase
} from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../index';

export const useDispatch = () => useDispatchBase<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;

// export { useDispatchAction } from './useDispatchAction';
export { useStructuredSelector } from './useStructuredSelector';
