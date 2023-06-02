import React from 'react';
import { useDispatch, useSelector } from 'store/hooks';
import { selectCount, increment } from './CounterSlice';

export const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(increment());
      }}
    >
      <p>Counter: {count}</p>
    </div>
  );
};
