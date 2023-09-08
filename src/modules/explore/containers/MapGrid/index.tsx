import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Cell, Container } from './styled';
import { useSelector, useDispatch } from 'store/hooks';
import { gridSelector } from '../../selectors';
import { initGrid } from '../../reducers/gridReducer';

type Props = {
  cellSize?: number;
  onTileClick?: (e: MouseEvent, destination: number[]) => void;
  rows?: number;
  columns?: number;
  scale?: number;
};

export const MapGrid = React.memo(
  ({
    cellSize = 100,
    onTileClick,
    children,
    rows = 10,
    columns = 53,
    scale = 1
  }: PropsWithChildren<Props>) => {
    const dispatch = useDispatch();
    const [grid, setGrid] = useState<number[][]>([]);

    useEffect(() => {
      const createRow = () =>
        new Array(columns).fill(0).map((_, index) => index);

      setGrid(new Array(rows).fill(0).map(() => createRow()));

      dispatch(
        initGrid({
          rows,
          columns
        })
      );
    }, [columns]);

    return (
      <Container scale={scale}>
        <Grid grid={grid} cellSize={cellSize} onTileClick={onTileClick} />
        {children}
      </Container>
    );
  }
);

export const Grid = React.memo(
  ({
    grid,
    cellSize = 100,
    onTileClick
  }: {
    grid: number[][];
    cellSize?: number;
    onTileClick?: (e: MouseEvent, destination: number[]) => void;
  }) => {
    const PFGrid = useSelector(gridSelector);

    if (!grid) {
      return null;
    }

    return (
      <>
        {grid?.map((row, rowIndex) => (
          <>
            {row.map((_, cellIndex) => {
              const position = {
                x: cellIndex * cellSize,
                y: rowIndex * cellSize
              };

              return (
                <Cell
                  onClick={(e) => {
                    if (onTileClick) {
                      onTileClick(e, [rowIndex, cellIndex]);
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
      </>
    );
  }
);
