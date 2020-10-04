import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  TABLE_RESIZE,
  typeExcelAction,
  typePayloadTableResize,
  UPDATE_DATE,
} from './types';
import {typeDefStyles} from '../constans';

export const TableResizeAction =
    (payload: typePayloadTableResize): typeExcelAction => {
      return {
        type: TABLE_RESIZE,
        payload,
      };
    };

export const ChangeTextAction =
    (payload: {id: string, value: string}) : typeExcelAction => {
      return {
        type: CHANGE_TEXT,
        payload,
      };
    };

export const ChangeStyles = (payload: typeDefStyles): typeExcelAction => {
  return {
    type: CHANGE_STYLES,
    payload,
  };
};

export const ApplyStyle =
    (payload: {value: string, ids: string[]}): typeExcelAction => {
      return {
        type: APPLY_STYLE,
        payload,
      };
    };

export const ChangeTitle = (payload: string): typeExcelAction => {
  return {
    type: CHANGE_TITLE,
    payload,
  };
};

export const UpdateDate = (): typeExcelAction => {
  return {
    type: UPDATE_DATE,
  };
};
