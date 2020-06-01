import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {tableResize} from './table.resize';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root: HTMLElement) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML(): string {
    return createTable(25);
  }

  onMousedown(event: any) {
    if (event.target.dataset.resize) {
      tableResize(this.$root, event);
    }
  }
}

