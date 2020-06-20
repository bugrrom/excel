import {clone, storage} from '../core/utils';
import {defaultStyles} from '../constants';

const defaultState = {
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
  return state ? normalize(state) : clone(defaultState)
}