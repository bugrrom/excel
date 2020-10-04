import {defaultStyles, defaultTitle} from '../constans';
import {clone} from '../core/utils';

export type typeDefState = {
    rowState: {[id: string]: string},
    colState: {[id: string]: string},
    dataState: {[id: string]: string},
    currentText: string,
    currentStyles: typeof defaultStyles
    stylesState: any
    title: string
    openDate: string
}

export const defaultState: typeDefState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  stylesState: {},
  title: defaultTitle,
  openDate: new Date().toJSON(),
};

const normalize = (state: typeDefState) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export const normalizeInitialState = (state: typeDefState) => {
  return state ? normalize(state) : clone(defaultState);
};
