export const getElementBoundsWithinContainer = (
  element: HTMLElement,
  container: HTMLElement
) => {
  if (!element || !container) return {};
  const elementBounds = element.getBoundingClientRect();
  const { width, height } = elementBounds;
  const containerBounds = container.getBoundingClientRect();

  return {
    width,
    height,
    x: elementBounds.x - containerBounds.x,
    y: elementBounds.y - containerBounds.y,
    top: elementBounds.top - containerBounds.top,
    left: elementBounds.left - containerBounds.left,
    right: elementBounds.right - containerBounds.left,
    bottom: elementBounds.bottom - containerBounds.top
  };
};
