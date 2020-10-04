import {ExcelComponents} from '../../core/ExcelComponents';
import {$, Dom} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import {CreateStore} from '../../core/store/createStore';
import {ChangeTitle} from '../../redux/action';
import {defaultTitle} from '../../constans';
import {debounce} from '../../core/utils';
import {ActiveRoute} from '../../core/router/ActiveRoute';
import {IEvent} from '../interface';


export type typeHeader = {
    toHTML: () => string
    onInput: (event :IEvent) => void
    onClick: (event: IEvent) => void
}

export class Header extends ExcelComponents implements typeHeader {
    static className = 'excel__header';
    constructor($root: Dom, emitter: Emitter, store: CreateStore) {
      super($root, {
        name: 'Header',
        emitter,
        store,
        listeners: ['input', 'click'],
      });
    }

    prepare() {
      this.onInput = debounce(this.onInput, 300);
    }

    toHTML() {
      const title = this.store?.getState().title || defaultTitle;
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

    onInput(event :IEvent) {
      const $target = $(event.target);
      this.$dispatch(ChangeTitle($target.text()));
    }

    onClick(event: IEvent) {
      const $target = $(event.target);
      if ($target.data?.button === 'remove') {
        const decision =
            confirm('Вы действительно хотите удалить эту таблицу?');
        if (decision) {
          localStorage.removeItem('excel:' + ActiveRoute.param);
          ActiveRoute.navigate('');
        }
      } else if ($target.data?.button === 'exit') {
        ActiveRoute.navigate('');
      }
    }
}
