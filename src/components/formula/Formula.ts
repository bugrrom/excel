import {ExcelComponents} from '../../core/ExcelComponents';
import {$, Dom} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import {CreateStore} from '../../core/store/createStore';

export type typeFormula = {
    toHTML: () => string
    onInput: (event: InputEvent) => void
    init: () => void
    storeChanged: (changed: {currentText: string}) => void
    onKeydown: (event: KeyboardEvent) => void
}

export class Formula extends ExcelComponents implements typeFormula {
    static className = 'excel__formula';
    private $formula: Dom | undefined;
    constructor($root: Dom, emitter: Emitter, store: CreateStore) {
      super($root, {
        name: 'Formula',
        listeners: ['input', 'keydown'],
        emitter,
        store,
        subscribe: ['currentText'],
      });
    }

    init() {
      super.init();
      this.$formula = this.$root.find('#formula');
      this.$on('table:select', ($cell) => {
            this.$formula?.text($cell.data.value);
      });
    }

    toHTML() {
      return `
      <div class="info">fx</div>
      <div  id="formula" class="input" contenteditable spellcheck="false"></div>
      `;
    }
    onInput( event: InputEvent) {
      // @ts-ignore
      const text = $(event.target).text();
      if ( event.target) {
        this.$emit('formula:input', text);
      }
    }
    storeChanged(changed: {currentText: string}) {
        this.$formula?.text(changed.currentText);
    }
    onKeydown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.$emit('formula:done', '');
      }
    }
}
