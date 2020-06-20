import {clone} from '../core/utils';
import {defaultStyles} from '../constants';

interface iDefaultState {
  colState: any,
  rowState: any,
  dataState: any,
  stylesState: any,
  currentText: string,
  currentStyles: any,
  title: string,
  openedData: any
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

const normalize = (s) => ({
  ...s,
  currentStyles: defaultStyles,
  currentText: '',
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
