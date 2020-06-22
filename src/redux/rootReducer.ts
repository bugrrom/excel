import {
  APPLY_STYLE,
  CHANGE_TEXT,
  CURRENT_STYLE,
  TABLE_RESIZE,
  CHANGE_TITLE,
  UPDATE_DATE,
}
  from './type';
import {iDefaultState} from './initialState';


export type actionType = {type: string, payload?: any}


export function rootReducer(state: iDefaultState, action: actionType) {
  let field;
  let val;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.payload.type === 'coll' ? 'colState' : 'rowState';
      return {...state, [field]: value(state, field, action)};
    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.payload.value,
        dataState: value(state, field, action)};
    case CURRENT_STYLE:
      return {
        ...state, currentStyles: action.payload,
      };
    case APPLY_STYLE:
      field = 'stylesState';
      val = state[field] || {};
      action.payload.ids.forEach( (id) => {
        val[id] = {...val[id], ...action.payload.value};
      });
      return {
        ...state, [field]: val,
        currentStyles: {...state.currentStyles, ...action.payload.value},
      };
    case CHANGE_TITLE:
      return {
        ...state, title: action.payload,
      };
    case UPDATE_DATE: {
      return {...state, openedDate: new Date().toJSON()};
    }
    default:
      return state;
  }
  return state;
}

function value(state: iDefaultState, field: string, action: actionType) {
  const val = state[field] || {};
  val[action.payload.id] = action.payload.value;
  return val;
}
