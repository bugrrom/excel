import {ExcelComponent} from '../../core/ExcelComponent';
import {IEmitter} from "../interface";

interface IToolbar {
  toHTML: () => string
}

export class Toolbar extends ExcelComponent implements IToolbar{
  static className = 'excel__toolbar';
  constructor($root: HTMLElement | Element, options: IEmitter) {
    super($root, {
      name: 'Toolbar',
      ...options,
    });
  }

  toHTML(): string {
    return `
      <div class="button">
        <i class="material-icons">format_align_left</i>
      </div>

      <div class="button">
        <i class="material-icons">format_align_center</i>
      </div>

      <div class="button">
        <i class="material-icons">format_align_right</i>
      </div>

      <div class="button">
        <i class="material-icons">format_bold</i>
      </div>

      <div class="button">
        <i class="material-icons">format_italic</i>
      </div>

      <div class="button">
        <i class="material-icons">format_underlined</i>
      </div>
    `;
  }
}
