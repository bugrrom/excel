import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {tableResize} from './table.resize';
import {ITableSelection, TableSelection} from './TableSelection';
import {$, IDom} from '../../core/dom';
import {nextSelection, range} from '../../core/utils';
import {IEvent, IOptional} from '../interface';

interface IExcelComponent {
  init: () => void
  toHTML: () => string
  onMousedown: (event: IEvent) => void
  selectCell:($cell: string|HTMLElement|Element|DOMRect|undefined) => void
}

export class Table extends ExcelComponent implements IExcelComponent {
  static className = 'excel__table';
  private selection: ITableSelection | undefined;

  constructor($root: HTMLElement | Element, options: IOptional) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  init() {
    super.init();
    this.selection = new TableSelection();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);
    this.$on('Formula:input', (text) => {
      if (this.selection?.current) {
        if ('text' in this.selection?.current) {
          this.selection?.current.text(text);
        }
      }
    });
    this.$on('Formula:done', ()=>{
      if (this.selection?.current) {
        if ('focus' in this.selection?.current) {
          this.selection?.current.focus();
        }
      }
    });
  }

  selectCell($cell: string|HTMLElement|Element|DOMRect|undefined) {
    this.selection?.select($cell);
    this.$emit('table:select', $cell);
  }

  toHTML(): string {
    return createTable(25);
  }

  onMousedown(event: IEvent) {
    if ('target' in event && event.target.dataset.resize) {
      tableResize(this.$root, event);
    } else if ('target' in event && event.target.dataset.type === 'cell') {
      const $target: IDom | HTMLElement[] | DOMRect | HTMLElement = $(event.target);
      if (event.ctrlKey) {
        this.selection?.selectGroup($target);
      } else if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);
        const cols = range(current.col, target.col);
        const rows = range(current.row, target.row);
        const ids = cols.reduce((acc, col) => {
          rows.forEach((row) => acc.push(`${row}:${col}`));
          return acc;
        }, []);
        const $cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection?.selectGroup($cells);
      } else {
        this.selection?.select($target);
      }
    }
  }

  onKeydown(event: KeyboardEvent) {
    const keys =
        ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection?.current.id(true);
      const $next = this.$root.find(nextSelection(event.key, id));
      this.selectCell($next);
    }
  }

  onInput(event: IEvent) {
    this.$emit('table:input', $(event.target));
  }
}


