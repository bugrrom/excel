import {APPLY_STYLE, CHANGE_TEXT, CURRENT_STYLE, TABLE_RESIZE, CHANGE_TITLE, UPDATE_DATE} from './type';
import {toInlineStyles} from "../core/utils";

export type actionType = {type: string, data?: any}
export type stateType = {
  colState: any,
  rowState: any,
  currentText: any,
  dataState: any
}

export function rootReducer(state: stateType, action: actionType) {
  let field;
  let val;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'coll' ? 'colState' : 'rowState';
      return {...state, [field]: value(state, field, action)};
    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        dataState: value(state, field, action)};
    case CURRENT_STYLE:
      return {
        ...state, currentStyles: action.data,
      };
    case APPLY_STYLE:
      field = 'stylesState';
      val = state[field] || {};
      action.data.ids.forEach( (id) => {
        val[id] = {...val[id], ...action.data.value};
      })
      return {
        ...state, [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }
    case CHANGE_TITLE :
      return {
        ...state, title: action.data
      }
    case UPDATE_DATE: {
      return {...state, openedDate: new Date().toJSON()}
    }
    default:
      return state;
  }
  return state;
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
