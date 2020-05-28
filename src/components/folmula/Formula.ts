import {ExcelComponent} from '../../core/ExcelComponent';

interface IFormula {
  toHTML: () => string,
  onInput: (event: any) => void,
  onClick: () => void
}

export class Formula extends ExcelComponent implements IFormula {
  static className = 'excel__formula';
  constructor($root: HTMLElement) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }
  toHTML(): string {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event: any) {
    console.log('Formula: onInput', event.target.textContent.trim());
  }

  onClick() {

  }
}
