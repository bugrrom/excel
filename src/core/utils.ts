import {defaultStyles} from '../constans';

export const capitalize = (string: string): string => {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const range = (start: number, end: number): number[] => {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((e, index) => start + index);
};

export const storage = (key: string, data: any =null ) => {
  if (!data) {
    return JSON.parse(<string>localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
};

export const isEqual = <T, U>(a: T, b: U) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  // @ts-ignore
  return a===b;
};

export const camelToDashCase = (str: string) => {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

export const toInlineStyles = (styles = {}) => {
  return Object.keys(styles)
      .map((key) => `${camelToDashCase(key)}: ${(styles as any)[key]}`)
      .join(';');
};

export const debounce = (fn: (...arg: any)=>void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      // @ts-ignore
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const clone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
