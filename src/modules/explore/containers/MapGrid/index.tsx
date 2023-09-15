import React, { Fragment, PropsWithChildren } from 'react';
import { Cell, Container } from './styled';
import { useSelector } from 'store/hooks';
import { gridSelector, PFGridSelector } from '../../selectors';

type Props = {
  cellSize?: number;
  onTileClick?: (e: MouseEvent, destination: number[]) => void;
  scale?: number;
  displayGrid?: number;
};

export const MapGrid = React.memo(
  ({
    cellSize = 100,
    onTileClick,
    children,
    scale = 1,
    displayGrid = false
  }: PropsWithChildren<Props>) => {
    const grid = useSelector(gridSelector);

    if (!grid) return null;

    return (
      <Container scale={scale}>
        <Grid
          grid={grid}
          cellSize={cellSize}
          displayGrid={displayGrid}
          onTileClick={onTileClick}
        />
        {children}
      </Container>
    );
  }
);

export const Grid = React.memo(
  ({
    grid,
    cellSize = 100,
    onTileClick,
    displayGrid = false
  }: {
    grid: number[][];
    cellSize?: number;
    displayGrid?: boolean;
    onTileClick?: (e: MouseEvent, destination: number[]) => void;
  }) => {
    const PFGrid = useSelector(PFGridSelector);

    return (
      <>
        {grid?.map((row, rowIndex) => (
          <Fragment key={`${rowIndex}-grid-row`}>
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
                  key={`${rowIndex}-${cellIndex}`}
                  position={position}
                  width={cellSize}
                  height={cellSize}
                  visible={displayGrid}
                />
              );
            })}
          </Fragment>
        ))}
      </>
    );
  }
);
