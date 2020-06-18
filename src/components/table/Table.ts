import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {tableResize} from './table.resize';
import {ITableSelection, TableSelection} from './TableSelection';
import {$, IDom} from '../../core/dom';
import {nextSelection, range} from '../../core/utils';
import {IEvent, IOptional} from '../interface';
import {applyStyle, changeStyles, changeText, tableResizes} from '../../redux/action';
import {ICreateStore} from '../../core/createStore';
import {defaultStyles} from '../../constants';
import { parse } from '../../core/parse';

interface IExcelComponent {
  init: () => void
  toHTML: () => string
  onMousedown: (event: IEvent) => void
  selectCell:($cell: Element | IDom | undefined | HTMLElement) => void
  resizeTable: (event: IEvent) => void
}

export class Table extends ExcelComponent implements IExcelComponent {
  static className = 'excel__table';
  private selection: ITableSelection | undefined;
  private store: ICreateStore;

  constructor($root: HTMLElement | Element | IDom, options: IOptional) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
    this.store = options.store;
  }

  init() {
    super.init();
    this.selection = new TableSelection();
    let $cell;
    if ('find' in this.$root) {
      $cell = this.$root.find('[data-id="0:0"]');
    }
    this.selectCell($cell);
    this.$on('Formula:input', (text) => {
      if (this.selection?.current) {
        if ('text' in this.selection?.current) {
          this.selection.current.attr('data-value', text).text(parse(text))

          this.updateTextInStore(text)
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
    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style);
      this.$dispatch(applyStyle({
        value: style,
        ids: this.selection.selectedIds,
      }));
    });
  }

  selectCell($cell: Element | IDom | undefined | HTMLElement) {

      this.selection?.select($cell);
      this.$emit('table:select', $cell);
      const styles = $cell.getStyles(Object.keys(defaultStyles))
      this.$dispatch(changeStyles(styles))
  }

  toHTML(): string {
    return createTable(25, this.store.getState());
  }

  async resizeTable(event: IEvent) {
    try {
      const data = await tableResize(this.$root, event);
      this.$dispatch(tableResizes(data));
    } catch (e) {
      console.warn(e);
    }
  }

  onMousedown(event: IEvent) {
    if ('target' in event && event.target.dataset.resize) {
      this.resizeTable(event);
    } else if ('target' in event && event.target.dataset.type === 'cell') {
      const $target: IDom | HTMLElement[] | DOMRect | HTMLElement =
          $(event.target);
      if (event.ctrlKey) {
        console.log(event.ctrlKey);
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
        this.selectCell($target);
      }
    }
  }

  onKeydown(event: KeyboardEvent) {
    const keys =
        ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      if (this.selection?.current) {
        let id;
        if ('id' in (this.selection?.current)) {
          id = this.selection?.current.id(true);
        }
        if ('find' in this.$root) {
          const $next = this.$root.find(nextSelection(event.key, id));
          this.selectCell($next);
        }
      }
    }
  }

  updateTextInStore(value) {
    this.$dispatch(changeText({
      id: this.selection?.current.id(),
      value,
    }));
  }

  onInput(event: IEvent) {
    /*this.$emit('table:input', $(event.target))*/
    this.updateTextInStore($(event.target).text())
  }
}


