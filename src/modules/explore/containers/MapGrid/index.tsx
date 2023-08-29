import React, { PropsWithChildren, useRef } from 'react';
import PF from 'pathfinding';
import { Cell, Grid } from './styled';

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
  const createRow = () => new Array(columns).fill(0).map((_, index) => index);
  const grid = new Array(rows).fill(0).map(() => createRow());

  const PFGridRef = useRef(new PF.Grid(rows, columns));
  const finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });

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
                  const [heroPositionRow, heroPositionColumn] =
                    heroGridPosition;

                  const path = finder.findPath(
                    heroPositionRow,
                    heroPositionColumn,
                    rowIndex,
                    cellIndex,
                    PFGridRef.current.clone()
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
                  PFGridRef.current.setWalkableAt(rowIndex, cellIndex, blocked);
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
