import {ExcelComponents} from '../../core/ExcelComponents';
import {createTable} from './table.template';
import {$, Dom} from '../../core/dom';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {matrix, nextSelector} from './table.function';
import {Emitter} from '../../core/Emitter';
import {CreateStore} from '../../core/store/createStore';
import {
  ApplyStyle,
  ChangeStyles,
  ChangeTextAction,
  TableResizeAction,
} from '../../redux/action';
import {defaultStyles} from '../../constans';
import {parse} from '../../core/parse';
import {IEvent} from '../interface';

export type typeTable = {
    toHTML: () => void
    onMousedown: (event: IEvent) => void
    init: () => void
    selectCell: ($cell: Dom | undefined) => void
    onKeydown: (event: KeyboardEvent) => void
    updateTextInStore: (value: string) => void
    onInput: (event: IEvent) => void
}

export class Table extends ExcelComponents implements typeTable {
    static className = 'excel__table';
    selection: TableSelection | undefined | null;

    constructor($root: Dom, emitter: Emitter, store: CreateStore) {
      super($root, {
        name: 'Table',
        listeners: ['mousedown', 'keydown', 'input'],
        emitter,
        store,
      });
    }

    toHTML() {
      if (this.store?.getState()) {
        return createTable(50, this.store?.getState());
      }
    }

    init() {
      super.init();
      this.selection = new TableSelection();
      const $cell = this.$root.find('[data-id="0:0"]');
      this.selectCell($cell);
      this.$on('formula:input', (text) => {
        if (this.selection?.current) {
          if (this.selection.current instanceof Dom) {
            this.selection.current.attr('data-value', text);
          }
          if (this.selection.current instanceof Dom) {
            this.selection.current.text(parse(text));
          }
        }
        this.updateTextInStore(text);
      });
      this.$on('formula:done', () => {
        if (this.selection?.current) {
          if (this.selection.current instanceof Dom) {
            this.selection.current.onFocus();
          }
        }
      });
      this.$on('toolbar:applyStyle', (value) => {
            this.selection?.applyStyle(value);
            this.$dispatch(ApplyStyle({
              value,
              ids: this.selection? this.selection.selectedIds : [],
            }));
      });
    }

    selectCell($cell: Dom | undefined) {
      if ( this.selection) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        const keys = Object.keys(defaultStyles);
        const styles = $cell?.getStyles(keys);
        // @ts-ignore
        this.$dispatch(ChangeStyles(styles));
      }
    }

    async resizeTable(event: IEvent) {
      try {
        // @ts-ignore
        const res :{value: string, id: string, type: string} =
            await resizeHandler(event, this.$root);
        // eslint-disable-next-line new-cap
        this.$dispatch(TableResizeAction(res));
      } catch (e) {
        console.warn('Resize error', e.message);
      }
    }

    onMousedown(event: IEvent): void {
      if ('target' in event && event.target.dataset.resize) {
        this.resizeTable(event);
      } else if ('target' in event && event.target.dataset.type === 'cell') {
        const $target = $(event.target);
        if (event.shiftKey) {
          // @ts-ignore
          const target: { row: number; col: number } =
                    $target.id(true);
          const current: { row: number, col: number } =
                    // @ts-ignore
                    this.selection.current.id(true);
          const $cells =
                    matrix(target, current).map((id) =>
                      this.$root.find(`[data-id="${id}"]`));
                this.selection?.selectGroup($cells);
        } else {
          this.selectCell($target);
        }
      }
    }
    onKeydown(event: KeyboardEvent) {
      const keys = [
        'Enter',
        'Tab',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight'];
      const {key} = event;
      if (keys.includes(key) && !event.shiftKey) {
        event.preventDefault();
        // @ts-ignore
        const id = this.selection?.current.id(true);
        const $next = this.$root.find(nextSelector(key, id));
        this.selectCell($next);
      }
    }

    updateTextInStore(value: string) {
      this.$dispatch(ChangeTextAction({
        // @ts-ignore
        id: this.selection?.current.id(),
        value,
      }));
    }

    onInput(event: IEvent) {
      this.updateTextInStore($(event.target).text());
    }
}

