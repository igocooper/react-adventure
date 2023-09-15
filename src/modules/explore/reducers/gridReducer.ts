import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import PF from 'pathfinding';
import type { Grid } from 'pathfinding';
import { transformToMatrix } from '../helpers/transformToMatrix';

const initialState: {
  grid: Nullable<Array<Array<number>>>;
  PFGrid: Nullable<Grid>;
  pathFinder: Nullable<PF.AStarFinder>;
} = {
  grid: null,
  PFGrid: null,
  pathFinder: null
};

type Payload = {
  grid: number[][];
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    initGrid: (_, action: PayloadAction<Payload>) => {
      const { grid } = action.payload;

      const matrix = transformToMatrix(grid);
      const PFGrid = new PF.Grid(matrix);

      return {
        grid,
        PFGrid,
        pathFinder: new PF.AStarFinder({
          allowDiagonal: true,
          dontCrossCorners: true
        })
      };
    }
  }
});

export const { initGrid } = gridSlice.actions;

export const gridReducer = gridSlice.reducer;
