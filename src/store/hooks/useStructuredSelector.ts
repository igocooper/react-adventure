import type { Selector } from '@reduxjs/toolkit';
import { useSelector } from './index';
import type { RootState } from '../index';

export const useStructuredSelector = <
  KEY extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MAP extends { [key in KEY]: Selector<RootState, any> }
>(
  map: MAP
): { [key in KEY]: ReturnType<MAP[key]> } => {
  return useSelector((state: RootState) => {
    return (Object.keys(map) as KEY[]).reduce(
      (acc: { [key in KEY]: ReturnType<MAP[key]> }, key: KEY) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        acc[key] = map[key](state);

        return acc;
      },
      // eslint-disable-next-line
      {} as { [key in KEY]: ReturnType<MAP[key]> }
    );
  });
};
