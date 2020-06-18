import {ExcelComponent} from '../../core/ExcelComponent';
import {IEvent, IOptional} from '../interface';
import {changeTitle} from '../../redux/action';
import {$} from '../../core/dom'

interface IHeader {
    toHTML: () => string
}

export class Header extends ExcelComponent implements IHeader {
    static className = 'excel__header';
    constructor($root: HTMLElement | Element, options: IOptional) {
      super($root, {
        name: 'Header',
        listeners: ['input'],
        ...options,
      });
    }

    toHTML(): string {
      const title = this.store.getState().title || 'Новая таблица'
      return `
      <input type="text" class="input" value="${title}" />

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

    onInput(event: IEvent) {
      const $target = $(event.target)
      this.$dispatch(changeTitle($target.text()))
    }
}
