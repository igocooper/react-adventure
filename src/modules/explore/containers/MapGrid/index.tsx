import React, { PropsWithChildren, useEffect } from 'react';
import { Cell, Grid } from './styled';
import { useSelector, useDispatch } from 'store/hooks';
import { gridSelector, pathFinderSelector } from '../../selectors';
import { initGrid } from '../../reducers/gridReducer';

type Props = {
  cellSize?: number;
  onTileClick?: (e: MouseEvent, path: Array<[number, number]>) => void;
  heroGridPosition: [number, number];
  rows?: number;
  columns?: number;
};

export const MapGrid = ({
  cellSize = 100,
  onTileClick,
  heroGridPosition,
  children,
  rows = 6,
  columns = 30
}: PropsWithChildren<Props>) => {
  const dispatch = useDispatch();
  const PFGrid = useSelector(gridSelector);
  const pathFinder = useSelector(pathFinderSelector);
  const createRow = () => new Array(columns).fill(0).map((_, index) => index);
  const grid = new Array(rows).fill(0).map(() => createRow());

  useEffect(() => {
    dispatch(
      initGrid({
        rows,
        columns
      })
    );
  }, []);

  return (
    <Grid>
      {grid.map((row, rowIndex) => (
        <>
          {row.map((_, cellIndex) => {
            const position = {
              x: cellIndex * cellSize,
              y: rowIndex * cellSize
            };

            return (
              <Cell
                onClick={(e) => {
                  if (!PFGrid || !pathFinder) return;
                  const [heroPositionRow, heroPositionColumn] =
                    heroGridPosition;

                  const path = pathFinder.findPath(
                    heroPositionRow,
                    heroPositionColumn,
                    rowIndex,
                    cellIndex,
                    PFGrid.clone()
                  );

                  if (onTileClick) {
                    onTileClick(e, path);
                  }
                }}
                // TODO: remove this mock
                onContextMenu={(event) => {
                  event.preventDefault();
                  const node = event.target;
                  const blocked = node.classList.contains('barrel');
                  node.classList.toggle('barrel');

                  if (PFGrid) {
                    PFGrid.setWalkableAt(rowIndex, cellIndex, blocked);
                  }
                }}
                key={`${rowIndex - cellIndex}`}
                position={position}
                width={cellSize}
                height={cellSize}
              />
            );
          })}
        </>
      ))}
      {children}
    </Grid>
  );
};
