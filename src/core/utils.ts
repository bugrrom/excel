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

export function nextSelection(key: string, {row, col}: {row: number, col: number}): string {
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

export function storage(key: string, data = null) {
  if (!data) {
    return JSON.parse(<string>localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a: any, b: any) {
  if (typeof a === 'object' && typeof b === 'object'){
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map( (key) => `${camelToDashCase(key)} : ${styles[key]}`).join(';')
}

export function debounce(fn, wait) {
  let timeout: NodeJS.Timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

  }
}