import {toInlineStyles} from "../../core/utils";
import {defaultStyles} from "../../constants";
import {parse} from "../../core/parse";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(state: any, row: number) {
  return function(_:string, index:number) {
    const id = `${row}:${index}`;
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
        <div class="cell" contenteditable data-col="${index}" 
             data-id="${id}"
             data-type="cell"
             style="${styles}; width: ${getWidth(state.colState, index)}"
             data-value="${data || ''}"
             >${parse(data) || ''}
         </div>
    `;
  };
}

function toColumn({col, index, width}: {col: string, index: number, width: string}) {
  return `
        <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
           ${col}
           <div class="coll-resize" data-resize="coll"></div>
        </div>
         `;
}

function createRow(index: number|null, content: string, state: any): string {
  // eslint-disable-next-line max-len
  const resize = index ? ' <div class="row-resize" data-resize="row"></div>' : '';
  const height = getHeight(state, index);
  return `
        <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
            <div class="row-info">
                ${index?index:''}
               ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_: string, index: number) {
  return String.fromCharCode(CODES.A + index);
}

function getHeight(state: any, index: number|null) {
  return (state[index] ? state[index] : DEFAULT_HEIGHT) + 'px';
}

function getWidth(state: any, index: number) {
  return (state[index] ? state[index] : DEFAULT_WIDTH) + 'px';
}

function withWidthFrom(state: any) {
  return function(col: string, index: number) {
    return {
      col, index, width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 15, state: any = {}): string {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows: string[] = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');


  rows.push(createRow(null, cols, {}));
  for (let i = 0; i< rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, i))
        .join('');
    rows.push(createRow(i + 1, cells, state.rowState));
  }

  return rows.join('');
}
