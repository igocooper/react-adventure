const createRow = (columns: number, walkable = true) =>
  new Array(columns).fill(walkable ? 0 : 1);

type Args = {
  blockedRows?: number[];
  columns: number;
  rows: number;
};
export const createGrid = ({ blockedRows = [], columns, rows }: Args) => {
  return new Array(rows)
    .fill(0)
    .map((_, index) => createRow(columns, !blockedRows?.includes(index)));
};
