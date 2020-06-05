export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start: number, end: number) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill('').map(
      (_, index) => start + index
  );
}

export function nextSelection(key: string, {col, row}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col-1 < 0 ? 0 : col-1;
      break;
    case 'ArrowUp':
      row = row-1 < 0 ? 0 : row-1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
