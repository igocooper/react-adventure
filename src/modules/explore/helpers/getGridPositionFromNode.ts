export const getGridPositionFromNode = (node: HTMLElement) => {
  if (!node) {
    return [0, 0];
  }

  const gridPosition = node.getAttribute('data-grid-position');

  if (!gridPosition) {
    return [0, 0];
  }

  const [row, column] = gridPosition.split(',');

  if (!row || !column) {
    return [0, 0];
  }

  return [parseInt(row, 10), parseInt(column, 10)] as [number, number];
};
