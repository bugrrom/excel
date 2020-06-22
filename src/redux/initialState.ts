import {clone} from '../core/utils';
import {defaultStyles} from '../constants';

export interface iDefaultState {
    colState: object,
    rowState: object,
    dataState: object,
    stylesState: object,
    currentText: string,
    currentStyles: typeof defaultStyles,
    title: string,
    openedData: string
}

const defaultState: iDefaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  title: 'Новая таблица',
  openedData: new Date().toJSON(),
};

const normalize = (s: iDefaultState) => ({
  ...s,
  currentStyles: defaultStyles,
  currentText: '',
});

export function normalizeInitialState(state: iDefaultState): iDefaultState {
  return state ? normalize(state) : clone(defaultState);
}
