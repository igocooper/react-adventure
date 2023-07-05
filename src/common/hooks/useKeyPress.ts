import React, { useEffect } from 'react';

export const useKeyPress = (
  key: string,
  action: (e: Event) => void,
  el: HTMLElement | Window = window
) => {
  const savedAction = React.useRef<(e: Event) => void>();

  useEffect(() => {
    savedAction.current = action;
  }, [action]);

  useEffect(() => {
    const onKeyup = (e: Event) => {
      // @ts-expect-error
      if (e.key === key) savedAction.current?.(e);
    };

    el.addEventListener('keyup', onKeyup);

    return () => {
      el.removeEventListener('keyup', onKeyup);
    };
  }, [el, key]);
};
