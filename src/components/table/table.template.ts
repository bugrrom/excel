const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row: number) {
  return function(_:string, index:number) {
    return `
        <div class="cell" contenteditable data-col="${index}" 
             data-id="${row}:${index}"
             data-type="cell">
         </div>
    `;
  };
}

function toColumn(el: string, index: number) {
  return `
        <div class="column" data-type="resizable" data-col="${index}">
           ${el}
           <div class="coll-resize" data-resize="coll"></div>
        </div>
    `;
}

function createRow(index: number|string, content: string): string {
  // eslint-disable-next-line max-len
  const resize = index ? ' <div class="row-resize" data-resize="row"></div>' : '';
  return `
        <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15): string {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows: string[] = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');


  rows.push(createRow('', cols));
  for (let i = 0; i< rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(i))
        .join('');
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
