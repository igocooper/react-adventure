export function transformToMatrix(inputArray: number[][]): number[][] {
  const numRows = inputArray.length;
  const numCols = inputArray[0]!.length;

  // Initialize the new matrix with all zeros
  const matrix: number[][] = Array.from({ length: numCols }, () => Array(numRows).fill(0));

  // Populate the matrix by flipping rows to columns
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      // @ts-ignore
      matrix[j][i] = inputArray[i][j];
    }
  }

  return matrix;
}
