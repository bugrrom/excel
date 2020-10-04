import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  TABLE_RESIZE,
  typeExcelAction,
  UPDATE_DATE,
} from './types';
import {defaultState, typeDefState} from './initialState';


export const rootReducer =
    // @ts-ignore
    (state: typeDefState = defaultState, action: typeExcelAction) => {
      let field;
      let val: { [x: string]: string; };
      switch (action.type) {
        case TABLE_RESIZE:
          field = action.payload.type === 'col' ? 'colState' : 'rowState';
          return {...state, [field]: value(state, field, action)};
        case CHANGE_TEXT:
          field = 'dataState';
          return {
            ...state,
            currentText: action.payload.value,
            dataState: value(state, field, action),
          };
        case CHANGE_STYLES:
          return {...state, currentStyles: action.payload};
        case APPLY_STYLE:
          field = 'stylesState';
          val = (state as any)[field] || {};
          action.payload.ids.forEach((id) => {
            // @ts-ignore
            val[id] = {...val[id], ...action.payload.value};
          });
          return {
            ...state,
            [field]: val,
            // @ts-ignore
            currentStyles: {...state.currentStyles, ...action.payload.value},
          };
        case CHANGE_TITLE:
          return {...state, title: action.payload};
        case UPDATE_DATE:
          return {...state, openDate: new Date().toJSON()};
      }
      return state;
    };

function value(state: typeDefState, field: string, action: typeExcelAction) {
  const val = (state as any)[field] || {};
  // @ts-ignore
  val[action.payload.id] = action.payload.value;
  return val;
}
