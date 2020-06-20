import {ExcelComponent} from '../../core/ExcelComponent';
import {IEvent, IOptional} from '../interface';
import {changeTitle} from '../../redux/action';
import {$} from '../../core/dom';
import {ActiveRoute} from '../../core/routes/ActiveRoute';

interface IHeader {
    toHTML: () => string
}

export class Header extends ExcelComponent implements IHeader {
    static className = 'excel__header';

    constructor($root: HTMLElement | Element, options: IOptional) {
      super($root, {
        name: 'Header',
        listeners: ['input', 'click'],
        ...options,
      });
    }

    toHTML(): string {
      const title = this.store.getState().title || 'Новая таблица';
      return `
      <input type="text" class="input" value="${title}" />

      <div>

        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>

      </div>
        `;
    }

    onInput(event: IEvent) {
      const $target = $(event.target);
      this.$dispatch(changeTitle($target.text()));
    }

    onClick(event: IEvent) {
      const $target = $(event.target);
      if ($target.data.button === 'remove') {
        const decision = confirm('Вы действительно хотите удалить эту таблицу ?');
        if (decision) {
          localStorage.removeItem('excel:' + ActiveRoute.param);
          ActiveRoute.navigation('/');
        }
      } else if ($target.data.button === 'exit') {
        ActiveRoute.navigation('/');
      }
    }
}
