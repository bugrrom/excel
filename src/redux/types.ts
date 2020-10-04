import {typeDefStyles} from '../constans';

export type typePayloadTableResize = {
    id: string,
    value: string,
    type: string
}

export const TABLE_RESIZE = 'TABLE_RESIZE';
type TableResize = {
    type: typeof TABLE_RESIZE
    payload: typePayloadTableResize
}

export const CHANGE_TEXT = 'CHANGE_TEXT';
type ChangeText = {
    type: typeof CHANGE_TEXT
    payload: {id: string, value: string}
}

export const APPLY_STYLE = 'APPLY_STYLE';
type ApplyStyle = {
    type: typeof APPLY_STYLE
    payload: {value: string, ids: string[]}
}

export const CHANGE_STYLES = 'CHANGE_STYLES';
type ChangeStyles = {
    type: typeof CHANGE_STYLES,
    payload: typeDefStyles
}

export const CHANGE_TITLE = 'CHANGE_TITLE';
type ChangeTitle = {
    type: typeof CHANGE_TITLE
    payload: string
}

export const UPDATE_DATE = 'UPDATE_DATE';
type UpdateDate = {
    type: typeof UPDATE_DATE
}
export type typeExcelAction =
    TableResize |
    ChangeText |
    ApplyStyle |
    ChangeStyles |
    ChangeTitle |
    UpdateDate
