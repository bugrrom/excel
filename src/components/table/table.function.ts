import {range} from '../../core/utils';

export const nextSelector = (key: string, id: {row: number, col: number}) => {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      id.row++;
      break;
    case 'Tab':
    case 'ArrowUp':
      id.row = id.row - 1 < MIN_VALUE ? MIN_VALUE : id.row - 1;
      break;
    case 'ArrowLeft':
      id.col = id.col - 1 < MIN_VALUE ? MIN_VALUE : id.col - 1;
      break;
    case 'ArrowRight':
      id.col++;
  }
  return `[data-id="${id.row}:${id.col}"]`;
};

export const matrix = (target: { row: number; col: number },
    current: { row: number; col: number }) => {
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  const ids = cols.reduce((acc, col) => {
    // @ts-ignore
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
  return ids;
};
