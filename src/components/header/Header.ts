import {ExcelComponent} from '../../core/ExcelComponent';
import { IOptional} from '../interface';

interface IHeader {
    toHTML: () => string
}

export class Header extends ExcelComponent implements IHeader{
    static className = 'excel__header';
    constructor($root: HTMLElement | Element, options: IOptional) {
      super($root, {
        name: 'Header',
        ...options,
      });
    }

    toHTML(): string {
      return `
      <input type="text" class="input" value="Новая таблица" />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
        `;
    }
}
