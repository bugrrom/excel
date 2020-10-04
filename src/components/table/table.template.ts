import {typeDefState} from '../../redux/initialState';
import {toInlineStyles} from '../../core/utils';
import {defaultStyles} from '../../constans';
import {parse} from '../../core/parse';

const Codes = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const toCell =
    (i: number, state: typeDefState):
        (_: string, index: number) => string => {
      return function(_: string, index: number): string {
        const id = `${i}:${index}`;
        const data = state.dataState ? state.dataState[id] : '';
        const styles =
            toInlineStyles({...defaultStyles, ...state.stylesState[id]});
        const width = getWidth(state.colState, String(index));
        return `
        <div class="cell" 
        contenteditable 
        data-col="${index}" 
        data-id="${id}"
        data-type="cell"
        style="${styles}; width: ${width}"
        data-value="${data || ''}"
        >
          ${parse(data) || ''}
        </div>
    `;
      };
    };

const toColumn =
    ({col, index, width}:
         {col: string, index: number, width: string}): string => {
      return `
        <div 
          class="column" 
          data-type="resizable" 
          data-col="${index}"
          style="width: ${width}">
                ${col}
            <div class="coll-resize" data-resize="col"></div>
        </div>
        
    `;
    };

const createRow =
    (index?: number | null,
        content?: string,
        state?: { [p: string]: string } | undefined): string => {
      const resize = index ?
      ' <div class="row-resize" data-resize="row"></div>' :
      '';
      return `
        <div 
          class="row" 
          data-type="resizable" 
          data-row="${index}" 
          style="height: ${getHeight(state, String(index? index:''))}">
            <div class="row-info" >${index ? index : ''}
              ${resize}
            </div>
            <div class="row-data">${content ? content : ''}</div>
        </div>
    `;
    };

const toChar = (_: string, index: number): string => {
  return String.fromCharCode(Codes.A + index);
};

const getWidth =
    (state: { [p: string]: string } | undefined, index: string) => {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line max-len,@typescript-eslint/restrict-plus-operands
      return ((state as { [p: string]: string })[index] || DEFAULT_WIDTH) + 'px';
    };

const getHeight =
    (state: { [p: string]: string } | undefined, index: string) => {
      if (state) {
        return String(state[index]) + 'px';
      } else {
        return String(DEFAULT_HEIGHT) + 'px';
      }
    };

const withWidthFrom = (state: typeDefState) => {
  return function(col: string, index: number) {
    return {
      col, index, width: getWidth(state.colState, String(index)),
    };
  };
};

export const createTable = (rowsCount = 15, state: typeDefState): string => {
  const colsCount = Codes.Z - Codes.A + 1;
  const rows: string[] = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols));
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(i, state))
        .join('');
    rows.push(createRow(i + 1, cells, state.rowState));
  }
  return rows.join('');
};
