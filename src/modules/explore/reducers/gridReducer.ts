import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import PF from 'pathfinding';
import type { Grid } from 'pathfinding';

const initialState: {
  grid: Nullable<Grid>;
  pathFinder: Nullable<PF.AStarFinder>;
} = {
  grid: null,
  pathFinder: null
};

// type Matrix = Array<number[]>;

// TODO: it should use Matrix
type Payload = {
  columns: number;
  rows: number;
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    initGrid: (_, action: PayloadAction<Payload>) => {
      const { rows, columns } = action.payload;
      return {
        grid: new PF.Grid(rows, columns),
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
