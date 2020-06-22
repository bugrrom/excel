import {
  ActionTypes,
  APPLY_STYLE,
  CHANGE_TEXT,
  CHANGE_TITLE,
  CURRENT_STYLE,
  TABLE_RESIZE,
  UPDATE_DATE
} from './type';

export function tableResizes(payload: any): ActionTypes {
  return {
    type: TABLE_RESIZE,
    payload,
  };
}

export function changeText(payload: any): ActionTypes {
  return {
    type: CHANGE_TEXT,
    payload,
  };
}
export function changeStyles(payload): ActionTypes {
  return {
    type: CURRENT_STYLE,
    payload,
  };
}
export function applyStyle(payload): ActionTypes {
  return {
    type: APPLY_STYLE,
    payload,
  };
}
export function changeTitle(payload): ActionTypes {
  return {
    type: CHANGE_TITLE,
    payload,
  };
}

export function updateDate(): ActionTypes {
  return {
    type: UPDATE_DATE,
  };
}


