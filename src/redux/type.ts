export const TABLE_RESIZE = 'TABLE_RESIZE';
type tableResizes = {
    type: typeof TABLE_RESIZE,
    payload: any
}
export const CHANGE_TEXT = 'CHANGE_TEXT';
type changeText = {
    type: typeof CHANGE_TEXT,
    payload: any
}
export const APPLY_STYLE = 'APPLY_STYLE';
type applyStyle = {
    type: typeof APPLY_STYLE,
    payload: any
}
export const CURRENT_STYLE = 'CURRENT_STYLE';
type changeStyles = {
    type: typeof CURRENT_STYLE,
    payload: any
}
export const CHANGE_TITLE = 'CHANGE_TITLE';
type changeTitle = {
    type: typeof CHANGE_TITLE,
    payload: any
}
export const UPDATE_DATE = 'UPDATE_DATE';
type updateDate = {
    type: typeof UPDATE_DATE,
}

export type ActionTypes =
    tableResizes |
    changeText |
    applyStyle |
    changeStyles |
    changeTitle |
    updateDate;
