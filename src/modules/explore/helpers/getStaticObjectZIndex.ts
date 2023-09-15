export const getStaticObjectZIndex = (gridPositions: number[][]) => {
  // @ts-ignore
  return gridPositions.reduce((result, [y]) => {
    return y > result ? y : result;
  }, 0);
};
