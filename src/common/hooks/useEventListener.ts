import React from 'react';

export const useEventListener = (
  type: string,
  handler: (e: Event) => void,
  el: HTMLElement | Window = window
) => {
  const savedHandler = React.useRef<(e: Event) => void>();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const listener = (e: Event) => savedHandler?.current?.(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
};
