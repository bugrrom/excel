import {storage} from '../core/utils';
import {defaultStyles} from '../constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  title: 'Новая таблица',
};

const normalize = (s) => ({
  ...s,
  currentStyles: defaultStyles,
  currentText: '',
})

export const initialState =
    storage('excel-state') ? normalize(storage('excel-state')) : defaultState;
