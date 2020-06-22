import {ExcelComponent} from '../../core/ExcelComponent';
import {IEvent, IOptional} from '../interface';
import {$} from '../../core/dom';


interface IFormula {
  init: () => void,
  toHTML: () => string,
  onInput: (event: IEvent) => void,
  storeChanged: ({currentText}:{currentText: string}) => void,
  onKeydown: (event: KeyboardEvent) => void
}

export class Formula extends ExcelComponent implements IFormula {
  static className = 'excel__formula';
  private $formula: any;
  constructor($root: HTMLElement | Element, option: IOptional) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...option,
    });
  }

  init() {
    super.init();
    if ('find' in this.$root) {
      this.$formula = this.$root.find('#formula');
    }
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.data.value);
    });
  }

  toHTML(): string {
    return `
      <div class="info">fx</div>
      <div class="input" id="formula" contenteditable spellcheck="false"></div>
    `;
  }

  storeChanged({currentText}:{currentText: string}) {
    this.$formula.text(currentText);
  }

  onInput(event: IEvent) {
    if (event.target) {
      this.$emit('Formula:input', <string>$(event.target).text());
    }
  }

  onKeydown(event: KeyboardEvent) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('Formula:done');
    }
  }
}
